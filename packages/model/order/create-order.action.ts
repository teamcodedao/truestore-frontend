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
  }: Pick<
    CreateOrder,
    | 'shipping_lines'
    | 'meta_data'
    | 'billing'
    | 'set_paid'
    | 'shipping'
    | 'transaction_id'
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
      } satisfies CreateOrder,
    })
    .json<Order>();
}
