'use client';

import {startTransition, useRef} from 'react';
import {useRouter} from 'next/navigation';

import dayjs from 'dayjs';
import {useWillUnmount} from 'rooks';
import {toast} from 'sonner';

import {PaypalButtonSkeleton} from '@/components/skeleton';
import {generateReferenceId} from '@/lib/checkout';
import {fetchIp} from '@/lib/ip';
import {usePlatform} from '@common/platform';
import {type Order, type UpdateOrder} from '@model/order';
import type {CreateOrderRequestBody} from '@paypal/paypal-js';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import * as Sentry from '@sentry/nextjs';
import {fbpixel} from '@tracking/fbpixel';
import {firebaseTracking} from '@tracking/firebase';

interface PaypalButtonProps {
  total: number;
  subTotal: number;
  shippingTotal: number;
  forceReRender?: unknown[];
  lineItems: CreateOrderRequestBody['purchase_units'][number]['items'];
  productIds: number[];
  disabled?: boolean;
  onClick?: () => Promise<void>;
  onApprove: (
    params: Pick<UpdateOrder, 'shipping' | 'billing'> & {
      ip: string;
      invoiceId: string;
      transactionId?: string;
      fundingSource?: string;
    },
  ) => Promise<{order: Order; metadata: UpdateOrder['meta_data']}>;
  onError: (
    order: Order,
    options: {status: string; message: string},
  ) => Promise<void>;
}

function ImplPaypalButton({
  total,
  subTotal,
  shippingTotal,
  lineItems,
  productIds,
  forceReRender = [],
  disabled,
  onClick,
  onApprove,
  onError,
}: PaypalButtonProps) {
  const router = useRouter();
  const orderRef = useRef<Order | null>(null);
  const timeId = useRef<NodeJS.Timeout>();
  const fundingSource = useRef<string>('paypal');
  const invoiceIdRef = useRef<string>('');

  const [{isPending}] = usePayPalScriptReducer();

  const countTotal = productIds.length;

  useWillUnmount(() => {
    clearTimeout(timeId.current);
  });

  return (
    <>
      <PayPalButtons
        forceReRender={forceReRender}
        disabled={typeof window !== 'undefined' && disabled}
        onClick={async data => {
          invoiceIdRef.current = generateReferenceId();
          fundingSource.current = data.fundingSource as string;
          return onClick?.();
        }}
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
            for (const productId of productIds) {
              firebaseTracking.trackingPaypalError(productId, {
                message: error.message,
                stack: error.stack,
                name: error.name,
                time: dayjs()
                  .tz('America/Los_Angeles')
                  .format('DD-MM-YYYY HH:mm:ss'),
              });
            }
          }

          // Catch errors from the server actions
          startTransition(async () => {
            if (orderRef.current && orderRef.current.id) {
              try {
                await onError(orderRef.current, {
                  status,
                  message: errorMessage,
                });
              } catch (error) {
                Sentry.withScope(scope => {
                  scope.setTags({
                    update_order: 'failed',
                    update_order_notes: 'failed',
                  });
                  Sentry.captureException(error);
                });
                console.error(error);
              }
            }
          });

          toast.error('Your order could not be processed');

          Sentry.withScope(scope => {
            scope.setTags({
              payment: 'failed',
            });
            Sentry.captureException(error);
          });

          console.error(error);
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
                items: lineItems?.map(item => {
                  return {
                    ...item,
                    name: item.name.substring(0, 126),
                  };
                }),
                invoice_id: invoiceIdRef.current,
                custom_id: fundingSource.current,
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

          const {order: order_} = await onApprove({
            transactionId,
            shipping,
            billing,
            ip,
            invoiceId: invoiceIdRef.current,
            fundingSource: fundingSource.current,
          });

          orderRef.current = order_;
          // Tracking for firebase
          firebaseTracking.trackingOrder(orderRef.current?.order_key);

          timeId.current = setTimeout(() => {
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
            value: Number(orderRef.current.total),
            subTotal,
            total: orderRef.current.total,
            tax: orderRef.current.total_tax,
            category_name: 'Uncategorized',
            content_type: 'product',
            order_id: String(orderRef.current.id),
            content_ids: productIds.map(String),
            content_name: lineItems?.map(item => item.name).join(' - '),
            shipping: orderRef.current.shipping,
            coupon_used: '',
            coupon_name: '',
            shipping_cost: orderRef.current.shipping_total,
            // tags: '',
            // predicted_ltv: 0,
            // average_order: 0,
            // transaction_count: 0,
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
