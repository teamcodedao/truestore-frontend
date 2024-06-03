'use server';

import {headers} from 'next/headers';

import {createPlatformClient} from '@common/platform';

import type {CreateOrderNotes, OrderNotes} from './typings';

export async function createOrderNotes(
  orderId: string,
  note: CreateOrderNotes['note']
) {
  const domain = headers().get('host') ?? '';
  const client = await createPlatformClient(domain);

  return client
    .post(`v3/orders/${orderId}/notes`, {
      json: {
        note,
      } satisfies CreateOrderNotes,
    })
    .json<OrderNotes>();
}
