'use client';

import {useRef} from 'react';
import {useRouter} from 'next/navigation';

import {product} from 'remeda';
import {toast} from 'sonner';

import {PaypalButtonSkeleton} from '@/components/skeleton';
import {fetchIp} from '@/lib/ip';
import {usePlatform} from '@common/platform';
import {type Order, type UpdateOrder} from '@model/order';
import type {Product} from '@model/product';
import type {CreateOrderRequestBody} from '@paypal/paypal-js';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import * as Sentry from '@sentry/nextjs';
import {firebaseTracking} from '@tracking/firebase';

interface PaypalButtonProps {
  product: Product;
  total: number;
  subTotal: number;
  shippingTotal: number;
  invoiceId: string;
  lineItems: CreateOrderRequestBody['purchase_units'][number]['items'];
  onHandleApprove: (
    params: Pick<UpdateOrder, 'shipping' | 'billing'> & {
      ip: string;
      invoiceId: string;
      transactionId?: string;
    },
  ) => Promise<Order>;
  onHandleError: (
    order: Order,
    options: {status: string; message: string},
  ) => Promise<void>;
}

function ImplPaypalButton({
  product,
  invoiceId,
  total,
  subTotal,
  shippingTotal,
  lineItems,
  onHandleApprove,
  onHandleError,
}: PaypalButtonProps) {
  const router = useRouter();
  const orderRef = useRef<Order | null>(null);

  const [{isPending}] = usePayPalScriptReducer();

  return (
    <>
      <PayPalButtons
        onError={async error => {
          let status: 'failed' | 'cancelled' = 'cancelled';
          let errorMessage = 'Unknown error!!';

          if (error instanceof Error) {
            if (error.message.includes('Instrument declined')) {
              status = 'failed';
              errorMessage = `Instrument declined. The instrument presented was either declined by the processor or bank, or it can't be used for this payment. Order status changed from Pending payment to Failed.`;
            } else {
              errorMessage = error.message;
            }
            firebaseTracking.trackingPaypalError(product.id, {
              message: error.message,
              stack: error.stack,
              name: error.name,
              time: new Date().toISOString(),
            });
          }

          if (orderRef.current && orderRef.current.id) {
            try {
              onHandleError(orderRef.current, {
                status,
                message: errorMessage,
              });
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

          toast.error('Your order could not be processed');

          Sentry.withScope(scope => {
            scope.setTags({
              payment: 'failed',
            });
            Sentry.captureException(error);
          });

          console.error(error.message);
        }}
        createOrder={async (data, actions) => {
          if (total <= 0) {
            throw new Error('Your order could not be processed');
          }

          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  value: String(total),
                  currency_code: 'USD',
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: String(subTotal),
                    },
                    shipping: {
                      currency_code: 'USD',
                      value: String(shippingTotal),
                    },
                  },
                },
                items: lineItems,
                invoice_id: invoiceId,
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (!actions.order) {
            throw new Error('No order found');
          }
          const ip = (await fetchIp()) ?? '';
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

          orderRef.current = await onHandleApprove({
            transactionId,
            shipping,
            billing,
            ip,
            invoiceId,
          });

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
        }}
      />
      {isPending && <PaypalButtonSkeleton />}
    </>
  );
}

export default function PaypalButton(props: PaypalButtonProps) {
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
