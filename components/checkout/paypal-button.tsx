'use client';

import {useRef} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

import currency from 'currency.js';
import {useWillUnmount} from 'rooks';
import {toast} from 'sonner';

import {PaypalButtonSkeleton} from '@/components/skeleton';
import {fetchIp} from '@/lib/ip';
import {usePlatform} from '@common/platform';
import {type CartItem, useCart} from '@model/cart';
import {
  type CreateOrder,
  createOrder,
  createOrderNotes,
  type Order,
  type UpdateOrder,
  updateOrderFailed,
  updateOrderMetadata,
} from '@model/order';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import * as Sentry from '@sentry/nextjs';
import {fbpixel} from '@tracking/fbpixel';
import {firebaseTracking} from '@tracking/firebase';

interface PaypalButtonProps {
  onCreateCartItem?: () => CartItem | undefined;
}

function generateReferenceId(domain: string): string {
  const domainPart = domain.replace(/\.com$/, '').replace(/\.+/g, '');
  const randomChars = Math.random().toString(36).slice(2, 7);

  const randomDec = function (min: number, max: number) {
    return (Math.random() * (max - min) + min).toFixed(0);
  };

  const referenceId = `${domainPart}-${randomChars}-${randomDec(10000, 99999)}`;

  return referenceId;
}

function ImplPaypalButton(props?: PaypalButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeRef = useRef<NodeJS.Timeout>();
  const orderRef = useRef<Order | null>(null);

  const platform = usePlatform();
  const [{isPending}] = usePayPalScriptReducer();
  const [{carts, countTotal, subTotal, total}, {addCart, clearCart}] =
    useCart();

  useWillUnmount(() => {
    clearTimeout(timeRef.current);
  });

  return (
    <>
      <PayPalButtons
        forceReRender={[searchParams.get('variation')]}
        onError={async error => {
          let status: 'failed' | 'cancelled' = 'cancelled';
          let errorMessage = 'Unknown error!!';

          if (error instanceof Error) {
            if (error.message.includes('Instrument declined')) {
              status = 'failed';
              errorMessage = `Instrument declined. The instrument presented was either declined by the processor or bank, or it can’t be used for this payment. Order status changed from Pending payment to Failed.`;
            } else {
              errorMessage = error.message;
            }
          }

          if (orderRef.current && orderRef.current.id) {
            try {
              if (!orderRef.current.transaction_id) {
                await updateOrderFailed(orderRef.current.id, status);
              }
              await createOrderNotes(orderRef.current.id, errorMessage);
            } catch (error) {
              console.error(error);
              Sentry.withScope(scope => {
                scope.setTags({
                  update_order: 'failed',
                  update_order_notes: 'failed',
                });
                Sentry.captureException(error);
              });
            }
          }

          toast.error('Your order could not be processed', {
            description: errorMessage,
          });

          Sentry.withScope(scope => {
            scope.setTags({
              payment: 'failed',
            });
            Sentry.captureException(error);
          });

          console.error(error.message);
        }}
        createOrder={async (data, actions) => {
          let newTotal = total;

          if (carts.length === 0) {
            const cartItem = props?.onCreateCartItem?.();

            if (cartItem) {
              addCart(cartItem);
              newTotal = currency(
                cartItem.variation.sale_price || cartItem.variation.price,
              )
                .multiply(cartItem.quantity)
                .add(cartItem.variation.shipping_value).value;
            } else {
              throw new Error(
                'The product you selected is out of stock. Please try again or choose another product.',
              );
            }
          }

          if (newTotal <= 0) {
            throw new Error('Your order could not be processed');
          }

          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  value: String(newTotal),
                  currency_code: 'USD',
                },
                invoice_id: generateReferenceId(platform.domain),
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (!actions.order) {
            throw new Error('No order found');
          }
          const ip = await fetchIp();
          const order = await actions.order.capture();
          const transactionId =
            order.purchase_units?.[0].payments?.captures?.[0].id;
          const purchaseUnit = order.purchase_units?.[0];

          if (!purchaseUnit) {
            throw new Error('No purchase unit found');
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
            ip: ip ?? '',
            invoice_id: generateReferenceId(platform.domain),
          });

          let shippingLines: CreateOrder['shipping_lines'] = [];

          const maxItem = carts.reduce((max, item) => {
            const shippingValue = item.variation.shipping_value;
            if (shippingValue) {
              return shippingValue > (max.variation?.shipping_value || 0)
                ? item
                : max;
            }
            return max;
          }, carts[0]);
          if (maxItem.variation?.shipping_value) {
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
              set_paid: true,
              billing,
              shipping,
              transaction_id: transactionId || '',
            },
          );

          await createOrderNotes(
            orderRef.current.id,
            `PayPal transaction ID: ${transactionId}`,
          );

          timeRef.current = setTimeout(() => {
            router.replace(
              `/orders/${orderRef.current?.id}?key=${orderRef.current?.order_key}`,
            );
          }, 500);

          toast.success('Thank you for shopping', {
            description: `Your #${orderRef.current.id} order has been received successfully`,
            action: {
              label: 'My Order',
              onClick: () => {
                router.replace(
                  `/orders/${orderRef.current?.id}?key=${orderRef.current?.order_key}`,
                );
              },
            },
          });

          //Tracking for fbpixel
          fbpixel.trackPurchase({
            currency: 'USD',
            num_items: countTotal,
            value: parseFloat(orderRef.current.total),
            subTotal,
            total: orderRef.current.total,
            tax: orderRef.current.total_tax,
            category_name: 'Uncategorized',
            content_type: 'product',
            order_id: String(orderRef.current.id),
            content_ids: carts.map(cart => String(cart.product.id)),
            content_name: carts.map(cart => cart.product.name).join(' - '),
            // tags: '',
            shipping: orderRef.current.shipping,
            coupon_used: '',
            coupon_name: '',
            shipping_cost: orderRef.current.shipping_total,
            // predicted_ltv: 0,
            // average_order: 0,
            // transaction_count: 0,
          });

          // Tracking for firebase
          firebaseTracking.trackingOrder(orderRef.current.order_key);

          clearCart();
        }}
      />
      {isPending && <PaypalButtonSkeleton />}
    </>
  );
}

export default function PaypalButton(props?: PaypalButtonProps) {
  const platform = usePlatform();

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          process.env.NODE_ENV === 'production'
            ? platform.paypal_client_id
            : process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: 'USD',
        'disable-funding': 'paylater',
      }}
    >
      <ImplPaypalButton {...props} />
    </PayPalScriptProvider>
  );
}
