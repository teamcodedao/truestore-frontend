'use client';

import {useRef} from 'react';
import {useRouter} from 'next/navigation';

import {useWillUnmount} from 'rooks';
import {toast} from 'sonner';

import {PaypalButtonSkeleton} from '@/components/skeleton';
import {usePlatform} from '@common/platform';
import {useCart} from '@model/cart';
import {
  type CreateOrder,
  createOrder,
  createOrderMetadata,
  createOrderNotes,
  type Order,
  type UpdateOrder,
  updateOrder,
  updateOrderFailed,
  updateOrderMetadata,
} from '@model/order';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import {fbpixel} from '@tracking/fbpixel';
import {firebaseTracking} from '@tracking/firebase';

function generateReferenceId(domain: string, orderId: string): string {
  const domainPart = domain.substring(0, 6);

  const randomChars = Math.random().toString(36).substring(2, 4);

  const referenceId = `${domainPart}${randomChars}-${orderId}`;

  return referenceId;
}

function ImplPaypalButton() {
  const router = useRouter();
  const platform = usePlatform();

  const timeRef = useRef<NodeJS.Timeout>();
  const orderRef = useRef<Order>();
  const [{isPending}] = usePayPalScriptReducer();
  const [{carts, countTotal, subTotal}, {clearCart}] = useCart();

  useWillUnmount(() => {
    clearTimeout(timeRef.current);
  });

  return (
    <>
      <PayPalButtons
        onError={async error => {
          if (
            error instanceof Error &&
            error.message?.includes('Instrument declined')
          ) {
            await updateOrderFailed(String(orderRef.current?.id));
            await createOrderNotes(
              String(orderRef.current?.id),
              `Instrument declined. The instrument presented was either declined by the processor or bank, or it can’t be used for this payment. Order status changed from Pending payment to Failed.`,
            );
          }
          toast.error(
            error instanceof Error ? error.message : 'Unknown error!!',
            {
              description:
                'Your order could not be processed. Please try again, and contact for adminitration',
            },
          );
        }}
        createOrder={async (data, actions) => {
          if (carts.length === 0) {
            throw new Error(
              'Please select at least one product to complete your purchase',
            );
          }

          let shippingLines: CreateOrder['shipping_lines'] = [];
          const metadata: CreateOrder['meta_data'] = createOrderMetadata();

          const maxItem = carts.reduce((max, item) => {
            const shippingValue = item.variation.shipping_value;
            if (shippingValue !== undefined) {
              return shippingValue > (max.variation?.shipping_value || 0)
                ? item
                : max;
            }
            return max;
          }, carts[0]);

          if (
            maxItem.variation?.shipping_class_id !== undefined &&
            maxItem.variation.shipping_value !== undefined
          ) {
            shippingLines = [
              {
                method_id: 'flat_rate',
                total: maxItem.variation?.shipping_value.toString(),
              },
            ];
          }

          orderRef.current = await createOrder(
            carts.map(item => {
              return {
                product_id: item.product.id,
                quantity: item.quantity,
                variation_id: item.variation?.id,
              };
            }),
            {
              shipping_lines: shippingLines,
              meta_data: metadata,
            },
          );

          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  value: orderRef.current.total,
                  currency_code: 'USD',
                },
                custom_id: String(orderRef.current.id),
                invoice_id: generateReferenceId(
                  platform.domain,
                  String(orderRef.current.id),
                ),
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (!actions.order) {
            throw new Error('No order found');
          }

          const order = await actions.order.capture();
          const transactionId =
            order.purchase_units?.[0].payments?.captures?.[0].id;
          const purchaseUnit = order.purchase_units?.[0];

          if (!purchaseUnit) {
            throw new Error('No purchase unit found');
          }

          const wooOrderID = purchaseUnit.custom_id;

          if (!wooOrderID) {
            throw new Error('No order found');
          }

          const shipping: UpdateOrder['shipping'] = {
            first_name: order.payer?.name?.given_name,
            last_name: order.payer?.name?.surname,
            address_1: purchaseUnit.shipping?.address?.address_line_1,
            address_2: purchaseUnit.shipping?.address?.address_line_2 || '',
            city: purchaseUnit.shipping?.address?.admin_area_2,
            state: purchaseUnit.shipping?.address?.admin_area_1,
            postcode: purchaseUnit.shipping?.address?.postal_code,
            country: purchaseUnit.shipping?.address?.country_code,
          };

          const billing: UpdateOrder['billing'] = {
            ...shipping,
            phone: order.payer?.phone?.phone_number?.national_number || '',
            email: order.payer?.email_address,
          };

          const metadata: UpdateOrder['meta_data'] = updateOrderMetadata({
            transaction_id: transactionId,
          });

          const result = await updateOrder(wooOrderID, {
            billing,
            shipping,
            transaction_id: transactionId || '',
            meta_data: metadata,
          });

          await createOrderNotes(
            wooOrderID,
            `PayPal transaction ID: ${transactionId}`,
          );

          timeRef.current = setTimeout(() => {
            router.replace(`/orders/${result.id}?key=${result.order_key}`);
          }, 1000);

          toast.success('Thank you for shopping', {
            description: `Your #${result.id} order has been received successfully`,
            action: {
              label: 'Undo',
              onClick: () => {
                router.replace(`/orders/${result.id}?key=${result.order_key}`);
              },
            },
          });

          //Tracking for fbpixel
          fbpixel.trackPurchase({
            currency: 'USD',
            num_items: countTotal,
            value: parseFloat(result.total),
            subTotal,
            total: result.total,
            tax: result.total_tax,
            category_name: 'Uncategorized',
            content_type: 'product',
            order_id: wooOrderID,
            content_ids: carts.map(cart => String(cart.product.id)),
            content_name: carts.map(cart => cart.product.name).join(' - '),
            // tags: '',
            shipping: result.shipping,
            coupon_used: '',
            coupon_name: '',
            shipping_cost: result.shipping_total,
            // predicted_ltv: 0,
            // average_order: 0,
            // transaction_count: 0,
          });

          // Tracking for firebase
          firebaseTracking.trackingOrder(result.order_key);

          clearCart();
        }}
      />
      {isPending && <PaypalButtonSkeleton />}
    </>
  );
}

export default function PaypalButton() {
  const platform = usePlatform();

  return (
    <PayPalScriptProvider
      options={{
        clientId: platform.paypal_client_id,
        currency: 'USD',
        'disable-funding': 'paylater',
      }}
    >
      <ImplPaypalButton />
    </PayPalScriptProvider>
  );
}
