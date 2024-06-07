'use server';

import {headers} from 'next/headers';

import {createPlatformClient} from '@common/platform/ssr';

import type {Order, UpdateOrder} from './typings';

export async function updateOrder(
  orderId: string,
  {
    shipping,
    billing,
    transaction_id,
    meta_data,
  }: Pick<UpdateOrder, 'shipping' | 'billing' | 'transaction_id' | 'meta_data'>
) {
  const domain = headers().get('host') ?? '';
  const client = await createPlatformClient(domain);

  return client
    .put(`v3/orders/${orderId}`, {
      json: {
        billing,
        shipping,
        transaction_id,
        set_paid: true,
        meta_data,
      } satisfies UpdateOrder,
    })
    .json<Order>();
}
