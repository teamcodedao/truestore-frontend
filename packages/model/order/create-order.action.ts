'use server';

import {headers} from 'next/headers';

import {createPlatformClient} from '@common/platform/ssr';

import type {CreateOrder, Order} from './typings';

export async function createOrder(
  carts: CreateOrder['line_items'],
  {shipping_lines, meta_data}: Pick<CreateOrder, 'shipping_lines' | 'meta_data'>
) {
  const domain = headers().get('host') ?? '';
  const client = await createPlatformClient(domain);

  return client
    .post(`v3/orders`, {
      json: {
        payment_method: 'ppcp-gateway',
        set_paid: false,
        line_items: carts,
        shipping_lines,
        meta_data,
      } satisfies CreateOrder,
    })
    .json<Order>();
}
