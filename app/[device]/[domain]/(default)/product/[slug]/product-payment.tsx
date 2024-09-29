'use client';

import {useMemo} from 'react';

import currency from 'currency.js';

import {CheckoutPayment, PaypalButton} from '@/components/checkout';
import {useCart} from '@model/cart';
import {
  createOrder,
  createOrderNode,
  createOrderNotes,
  type PaymentMethod,
  type UpdateOrder,
  updateOrderFailed,
  updateOrderMetadata,
} from '@model/order';
import {useProduct, useProductVariation} from '@model/product';
import type {CreateOrderRequestBody} from '@paypal/paypal-js';
import {firebaseTracking} from '@tracking/firebase';

export default function ProductPayment() {
  const [{carts}] = useCart();
  const product = useProduct();
  const variation = useProductVariation();

  const quantity = 1;

  const lineItems = useMemo(() => {
    if (variation) {
      return [
        {
          name: (
            product.name +
            '-' +
            variation.attributes.map(i => i.name).join('-')
          ).substring(0, 126),
          quantity: String(quantity),
          unit_amount: {
            currency_code: 'USD',
            value: String(variation.price),
          },
          sku: String(variation.sku),
        } satisfies NonNullable<
          CreateOrderRequestBody['purchase_units'][number]['items']
        >[number],
      ];
    }

    return [];
  }, [product?.name, variation]);

  if (carts.length === 0 && variation) {
    const subTotal = currency(variation.price).multiply(quantity).value;
    const shippingTotal = variation.shipping_value;
    const total = currency(subTotal).add(shippingTotal).value;

    return (
      <PaypalButton
        forceReRender={[variation.id]}
        productIds={[product.id]}
        total={total}
        subTotal={subTotal}
        shippingTotal={shippingTotal}
        lineItems={lineItems}
        onClick={async () => {
          return firebaseTracking.trackingClickPaypal(product.id, 'PAYPAL2');
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
          const paymentMethod: PaymentMethod = 'ppcp-gateway';
          const orderData = {
            payment_method: paymentMethod,
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
            payment_method_title: 'paypal',
            total: String(total),
            shipping_total: String(shippingTotal),
            line_items: [
              {
                name: product.name,
                product_id: product.id,
                product_link: product.permalink,
                variation_id: variation.id,
                total: String(variation.price),
                price: variation.price,
                quantity: quantity,
                meta_data: variation.attributes,
                image: variation.image,
                sku: variation.sku,
              },
            ],
          };

          const order = await createOrderNode(orderData);

          firebaseTracking.trackPurchase(orderData, [product.id]);

          // const order = await createOrder(
          //   [
          //     {
          //       product_id: product.id,
          //       quantity,
          //       variation_id: variation.id,
          //     },
          //   ],
          //   {
          //     ...orderData,
          //     payment_method_title: fundingSource ?? 'paypal',
          //   },
          // );

          return {order, metadata};
        }}
        onError={async (order, {status, message}) => {
          if (!order.transaction_id) {
            await updateOrderFailed(order.id, status);
          }
          await createOrderNotes(order.id, message);
        }}
      />
    );
  }

  return (
    <CheckoutPayment
      onClick={async () => {
        firebaseTracking.trackingLogs(['CO'], product);
        return firebaseTracking.trackingClickPaypal(product.id, 'PAYPAL2');
      }}
    />
  );
}
