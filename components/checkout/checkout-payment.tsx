'use client';

import {useMemo, useRef} from 'react';
import Image from 'next/image';
import {useParams, useRouter} from 'next/navigation';

import {useWillUnmount} from 'rooks';

import {PaypalButton} from '@/components/checkout';
import trustbadge from '@/images/trustbadge.png';
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
import {fbpixel} from '@tracking/fbpixel';
import {firebaseTracking} from '@tracking/firebase';

interface CheckoutPaymentProps {
  noFooter?: boolean;
}

export default function CheckoutPayment({noFooter}: CheckoutPaymentProps) {
  const router = useRouter();
  const {domain} = useParams<{domain: string}>();
  const [{carts, countTotal, subTotal, total, shippingTotal}, {clearCart}] =
    useCart();

  const timeId = useRef<NodeJS.Timeout>();

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

  const lineItems = useMemo<
    CreateOrderRequestBody['purchase_units'][number]['items']
  >(() => {
    return carts.map(item => ({
      name: item.product.name + '-' + item.variation.attributes.join('-'),
      quantity: String(item.quantity),
      unit_amount: {
        currency_code: 'USD',
        value: String(item.variation.price),
      },
      sku: String(item.variation.id),
    }));
  }, [carts]);

  useWillUnmount(() => {
    clearTimeout(timeId.current);
  });

  return (
    <>
      <PaypalButton
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
            num_items: countTotal,
            value: Number(order.total),
            subTotal,
            total: order.total,
            tax: order.total_tax,
            category_name: 'Uncategorized',
            content_type: 'product',
            order_id: String(order.id),
            content_ids: carts.map(cart => String(cart.product.id)),
            content_name: carts.map(cart => cart.product.name).join(' - '),
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

          clearCart();

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
      {!noFooter && (
        <>
          <hr />
          <div className="mt-4 flex flex-col items-center gap-4 text-center">
            <p className="font-medium">
              All transactions are secure and encrypted by
            </p>
            <Image src={trustbadge} alt="" />
          </div>
        </>
      )}
    </>
  );
}
