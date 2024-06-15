'use server';

import {headers} from 'next/headers';

import {createPlatformClient} from '@common/platform/ssr';

import type {CreateOrder, Order} from './typings';

export async function createOrder(
  carts: CreateOrder['line_items'],
  {
    shipping_lines,
    meta_data,
    set_paid,
    billing,
    shipping,
    transaction_id,
    payment_method_title,
  }: Pick<
    CreateOrder,
    | 'shipping_lines'
    | 'meta_data'
    | 'billing'
    | 'set_paid'
    | 'shipping'
    | 'transaction_id'
    | 'payment_method_title'
  >,
) {
  const domain = headers().get('host') ?? '';
  const client = await createPlatformClient(domain);

  return client
    .post(`v3/orders`, {
      json: {
        billing,
        shipping,
        payment_method: 'ppcp-gateway',
        set_paid,
        line_items: carts,
        shipping_lines,
        meta_data,
        transaction_id,
        payment_method_title:
          payment_method_title == 'card'
            ? 'Credit or debit cards (PayPal)'
            : 'Paypal',
      } satisfies CreateOrder,
    })
    .json<Order>();
}
