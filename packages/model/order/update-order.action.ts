'use server';

import {client} from '@/lib/client';

import type {Order, UpdateOrder} from './typings';

export async function updateOrder(
  orderId: string,
  {shipping, billing}: Pick<UpdateOrder, 'shipping' | 'billing'>
) {
  return client
    .put(`v3/orders/${orderId}`, {
      json: {
        billing,
        shipping,
        set_paid: true,
      } satisfies UpdateOrder,
    })
    .json<Order>();
}
