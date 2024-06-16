'use client';

import {useMemo} from 'react';
import Image from 'next/image';
import {useParams} from 'next/navigation';

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

interface CheckoutPaymentProps {
  noFooter?: boolean;
}

export default function CheckoutPayment({noFooter}: CheckoutPaymentProps) {
  const {domain} = useParams<{domain: string}>();
  const [{carts, countTotal, subTotal, total, shippingTotal}, {clearCart}] =
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
    <>
      <PaypalButton
        forceReRender={[countTotal, total, subTotal, shippingTotal]}
        invoiceId={generateReferenceId(domain)}
        total={total}
        subTotal={subTotal}
        shippingTotal={shippingTotal}
        lineItems={lineItems}
        productIds={productIds}
        onClick={async () => {
          console.log('checkout');
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
