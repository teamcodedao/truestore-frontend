'use client';

import {useMemo, useRef} from 'react';
import {useParams, useRouter} from 'next/navigation';

import currency from 'currency.js';
import {useWillUnmount} from 'rooks';

import {CheckoutPayment, PaypalButton} from '@/components/checkout';
import {generateReferenceId} from '@/lib/checkout';
import {useCart} from '@model/cart';
import {
  createOrder,
  createOrderNotes,
  type UpdateOrder,
  updateOrderFailed,
  updateOrderMetadata,
} from '@model/order';
import {useProduct, useProductVariation} from '@model/product';
import type {CreateOrderRequestBody} from '@paypal/paypal-js';
import {fbpixel} from '@tracking/fbpixel';
import {firebaseTracking} from '@tracking/firebase';

export default function ProductPayment() {
  const {domain} = useParams<{domain: string}>();
  const router = useRouter();
  const [{carts}] = useCart();
  const product = useProduct();
  const variation = useProductVariation();

  const timeId = useRef<NodeJS.Timeout>();

  const quantity = 1;

  const lineItems = useMemo<
    CreateOrderRequestBody['purchase_units'][number]['items']
  >(() => {
    if (variation) {
      return [
        {
          name:
            product.name +
            '-' +
            variation.attributes.map(i => i.name).join('-'),
          quantity: String(quantity),
          unit_amount: {
            currency_code: 'USD',
            value: String(variation.price),
          },
          sku: String(variation.id),
        },
      ];
    }

    return [];
  }, [product?.name, variation]);

  useWillUnmount(() => {
    clearTimeout(timeId.current);
  });

  if (carts.length === 0 && variation) {
    const subTotal = currency(variation.price).multiply(quantity).value;
    const shippingTotal = variation.shipping_value;
    const total = currency(subTotal).add(shippingTotal).value;

    return (
      <PaypalButton
        product={product}
        key={total}
        invoiceId={generateReferenceId(domain)}
        total={total}
        subTotal={subTotal}
        shippingTotal={shippingTotal}
        lineItems={lineItems}
        onHandleApprove={async ({
          invoiceId,
          ip,
          transactionId,
          shipping,
          billing,
        }) => {
          const metadata: UpdateOrder['meta_data'] = updateOrderMetadata({
            transaction_id: transactionId,
            ip,
            invoice_id: invoiceId,
          });
          firebaseTracking.trackPurchase(
            {
              shipping_lines: [
                {
                  method_id: 'flat_rate',
                  total: String(shippingTotal),
                },
              ],
              meta_data: metadata,
              set_paid: true,
              billing,
              shipping,
              line_items: [
                {
                  product_id: product.id,
                  quantity,
                  variation_id: variation.id,
                },
              ],
              transaction_id: transactionId || '',
              date_created: new Date().toISOString(),
            },
            product.id,
          );

          const order = await createOrder(
            [
              {
                product_id: product.id,
                quantity,
                variation_id: variation.id,
              },
            ],
            {
              shipping_lines: [
                {
                  method_id: 'flat_rate',
                  total: String(shippingTotal),
                },
              ],
              meta_data: metadata,
              set_paid: true,
              billing,
              shipping,
              transaction_id: transactionId || '',
            },
          );

          await createOrderNotes(
            order.id,
            `PayPal transaction ID: ${transactionId}`,
          );

          //Tracking for fbpixel
          fbpixel.trackPurchase({
            currency: 'USD',
            num_items: quantity,
            value: Number(order.total),
            subTotal,
            total: order.total,
            tax: order.total_tax,
            category_name: 'Uncategorized',
            content_type: 'product',
            order_id: String(order.id),
            content_ids: [String(product.id)],
            content_name: product.name,
            shipping: order.shipping,
            coupon_used: '',
            coupon_name: '',
            shipping_cost: order.shipping_total,
            // tags: '',
            // predicted_ltv: 0,
            // average_order: 0,
            // transaction_count: 0,
          });

          // Tracking for firebase
          firebaseTracking.trackingOrder(order.order_key);

          timeId.current = setTimeout(() => {
            router.replace(`/orders/${order.id}?key=${order.order_key}`);
          }, 500);

          return order;
        }}
        onHandleError={async (order, {status, message}) => {
          if (!order.transaction_id) {
            await updateOrderFailed(order.id, status);
          }
          await createOrderNotes(order.id, message);
        }}
      />
    );
  }

  return <CheckoutPayment noFooter />;
}
