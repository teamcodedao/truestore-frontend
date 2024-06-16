'use client';

import {Suspense, useMemo} from 'react';
import Link from 'next/link';
import {useParams} from 'next/navigation';

import clsx from 'clsx';
import currency from 'currency.js';

import {PaypalButton} from '@/components/checkout';
import {PaypalButtonSkeleton} from '@/components/skeleton';
import {generateReferenceId} from '@/lib/checkout';
import {useCart} from '@model/cart';
import {
  type CreateOrder,
  createOrder,
  createOrderNotes,
  type UpdateOrder,
  updateOrderFailed,
  updateOrderMetadata,
} from '@model/order';
import type {CreateOrderRequestBody} from '@paypal/paypal-js';
import {firebaseTracking} from '@tracking/firebase';

import GroupCart from './group-cart';

interface CheckoutCartProps {
  onClose: () => void;
}

export default function CheckoutCart({onClose}: CheckoutCartProps) {
  const {domain} = useParams<{domain: string}>();

  const [{carts, countTotal, subTotal, shippingTotal, total}, {clearCart}] =
    useCart();

  const productIds = useMemo(() => {
    return carts.map(item => item.product.id);
  }, [carts]);

  const shippingLines = useMemo<CreateOrder['shipping_lines']>(() => {
    if (carts.length === 0) {
      return [];
    }

    const maxItem = carts.reduce((max, item) => {
      const shippingValue = item.variation?.shipping_value;
      if (shippingValue) {
        return shippingValue > (max.variation?.shipping_value || 0)
          ? item
          : max;
      }
      return max;
    }, carts[0]);

    if (maxItem.variation?.shipping_value) {
      return [
        {
          method_id: 'flat_rate',
          total: maxItem.variation?.shipping_value.toString(),
        },
      ];
    }

    return [];
  }, [carts]);

  const lineItems = useMemo(() => {
    return carts.map(
      item =>
        ({
          name: item.product.name + '-' + item.variation.attributes.join('-'),
          quantity: String(item.quantity),
          unit_amount: {
            currency_code: 'USD',
            value: String(item.variation.price),
          },
          sku: String(item.variation.id),
        }) satisfies NonNullable<
          CreateOrderRequestBody['purchase_units'][number]['items']
        >[number],
    );
  }, [carts]);

  return (
    <div className="flex h-screen w-[480px] max-w-full flex-col p-4 sm:p-8">
      <header className="relative shrink-0 border-b pb-8 sm:pb-10">
        <h3 className="text-2xl font-bold">
          Your shopping cart{' '}
          {countTotal > 0 ? <span>({countTotal})</span> : null}
        </h3>
        <button
          aria-label="Close Checkout"
          onClick={onClose}
          className={clsx(
            'absolute right-0 top-0 flex size-10 items-center justify-center rounded-full bg-gray-200 text-white transition',
            'hover:bg-gray-300',
          )}
        >
          <span className="i-carbon-close text-3xl"></span>
        </button>
      </header>

      <GroupCart />

      <footer className="mt-auto shrink-0 border-t pt-5">
        <div className="flex justify-between">
          <span className="text-lg">Subtotal</span>
          <span className="font-medium">{currency(subTotal).format()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg">Secured Shipping</span>
          <span className="font-medium">
            {currency(shippingTotal).format()}
          </span>
        </div>
        <div className="flex justify-between font-bold">
          <span className="text-lg">Total</span>
          <span>{currency(total).format()}</span>
        </div>
        <Link
          href="/checkout?from=checkout-cart"
          aria-disabled={carts.length === 0}
          className={clsx(
            'mt-5 block w-full rounded bg-black px-5 py-4 text-center text-xl font-bold text-white transition',
            'select-none aria-disabled:multi-[`bg-opacity-80;pointer-events-none`]',
          )}
        >
          Proceed to Checkout
        </Link>
        <div className="mt-0">
          <div className="relative my-2 text-center after:multi-[`absolute;w-full;h-0.5;bg-gray-200;left-0;top-1/2;-translate-y-1/2`]">
            <span className="relative z-10 inline-block bg-white px-3 text-sm font-medium">
              or quick checkout with
            </span>
          </div>
          <Suspense fallback={<PaypalButtonSkeleton />}>
            <PaypalButton
              forceReRender={[countTotal, total, subTotal, shippingTotal]}
              invoiceId={generateReferenceId(domain)}
              total={total}
              subTotal={subTotal}
              shippingTotal={shippingTotal}
              lineItems={lineItems}
              productIds={productIds}
              onClick={async () => {
                firebaseTracking.trackingClickPaypal(productIds[0], 'PAYPAL3');
                console.log('cart');
              }}
              onHandleApprove={async ({
                invoiceId,
                ip,
                transactionId,
                shipping,
                billing,
                fundingSource,
              }) => {
                const metadata: UpdateOrder['meta_data'] = updateOrderMetadata({
                  transaction_id: transactionId,
                  ip,
                  invoice_id: invoiceId,
                });

                const order = await createOrder(
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
                    transaction_id: transactionId,
                    payment_method_title: fundingSource ?? 'paypal',
                  },
                );

                await createOrderNotes(
                  order.id,
                  `PayPal transaction ID: ${transactionId}`,
                );

                clearCart();

                return {order, metadata};
              }}
              onHandleError={async (order, {status, message}) => {
                if (!order.transaction_id) {
                  await updateOrderFailed(order.id, status);
                }
                await createOrderNotes(order.id, message);
              }}
            />
          </Suspense>
        </div>
      </footer>
    </div>
  );
}
