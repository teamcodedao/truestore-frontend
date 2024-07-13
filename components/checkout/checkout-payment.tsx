'use client';

import {useMemo} from 'react';
import {useParams} from 'next/navigation';

import {PaypalButton} from '@/components/checkout';
import {generateReferenceId} from '@/lib/checkout';
import {useCart} from '@model/cart';
import {
  createOrder,
  createOrderNode,
  createOrderNotes,
  type UpdateOrder,
  updateOrderFailed,
  updateOrderMetadata,
} from '@model/order';
import type {CreateOrderRequestBody} from '@paypal/paypal-js';
import {firebaseTracking} from '@tracking/firebase';

interface CheckoutPaymentProps {
  onClick?: () => Promise<void>;
}

export default function CheckoutPayment({onClick}: CheckoutPaymentProps) {
  const {domain} = useParams<{domain: string}>();
  const [{carts, countTotal, subTotal, total, shippingTotal}, {clearCart}] =
    useCart();

  const productIds = useMemo(() => {
    return carts.map(item => item.product.id);
  }, [carts]);

  const lineItems = useMemo(() => {
    return carts.map(
      item =>
        ({
          name: (
            item.product.name +
            '-' +
            item.variation.attributes.join('-')
          ).substring(0, 126),
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
    <PaypalButton
      forceReRender={[countTotal, total, subTotal, shippingTotal]}
      disabled={carts.length === 0}
      invoiceId={generateReferenceId(domain)}
      total={total}
      subTotal={subTotal}
      shippingTotal={shippingTotal}
      lineItems={lineItems}
      productIds={productIds}
      onClick={async () => {
        firebaseTracking.trackingClickPaypal(carts[0].product.id, 'PAYPAL4');
        onClick?.();
      }}
      onApprove={async ({
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
        await createOrderNode({
          payment_method: 'ppcp-gateway',
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
          transaction_id: transactionId,
          payment_method_title: fundingSource ?? 'paypal',
          total: String(total),
          shipping_total: String(shippingTotal),
          line_items: carts.map(item => ({
            name: item.product.name,
            product_id: item.product.id,
            variation_id: item.variation.id,
            total: String(item.variation.price * item.quantity), // sửa để tổng giá là giá * số lượng
            price: item.variation.price,
            quantity: item.quantity,
            meta_data: item.variation.attributes,
            image: item.variation.image || '',
          })),
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
            transaction_id: transactionId,
            payment_method_title: fundingSource ?? 'paypal',
          },
        );

        clearCart();

        return {order, metadata};
      }}
      onError={async (order, {status, message}) => {
        console.info(`Error: ${status}`);
        if (!order.transaction_id) {
          await updateOrderFailed(order.id, status);
        }
        await createOrderNotes(order.id, message);
      }}
    />
  );
}
