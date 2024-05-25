'use client';

import {toast} from 'sonner';

import {PaypalButtonSkeleton} from '@/components/skeleton';
import {fbpixel} from '@common/fbpixel';
import {useCart} from '@model/cart';
import {createOrder, type UpdateOrder, updateOrder} from '@model/order';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: process.env.NEXT_PUBLIC_PAYPAL_CURRENCY,
};

function ImplPaypalButton() {
  const [{isPending}] = usePayPalScriptReducer();
  const [{carts, countTotal}, {clearCart}] = useCart();

  return (
    <>
      <PayPalButtons
        onError={error => {
          toast.error(
            error instanceof Error ? error.message : 'Unknown error!!',
            {
              description:
                'Your order could not be processed. Please try again, and contact for adminitration',
            }
          );
        }}
        createOrder={async (data, actions) => {
          const order = await createOrder(
            carts.map(item => {
              return {
                product_id: item.product.id,
                quantity: item.quantity,
                variation_id: item.variation?.id,
              };
            })
          );

          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  value: order.total,
                  currency_code: 'USD',
                },
                custom_id: String(order.id),
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (!actions.order) {
            throw new Error('No order found');
          }

          const order = await actions.order.capture();

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

          const result = await updateOrder(wooOrderID, {
            billing,
            shipping,
          });

          console.info(result);
          toast.success('Payment successful', {
            description: 'Your order has been processed successfully',
          });
          clearCart();

          fbpixel.trackPurchase({
            currency: 'USD',
            num_items: countTotal,
            value: 1,
            subTotal: 1,
            total: 1,
            tax: 1,
            category_name: 'Uncategorized',
            content_type: 'product',
            order_id: wooOrderID,
            content_ids: carts.map(cart => String(cart.product.id)),
            content_name: carts.map(cart => cart.product.name).join(' - '),
          });
        }}
      />
      {isPending && <PaypalButtonSkeleton />}
    </>
  );
}

export default function PaypalButton() {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <ImplPaypalButton />
    </PayPalScriptProvider>
  );
}
