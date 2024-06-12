'use server';

import {headers} from 'next/headers';

import {createPlatformClient} from '@common/platform/ssr';

import type {CreateOrderNotes, OrderNotes} from './typings';

export async function createOrderNotes(
  orderId: string | number,
  note: CreateOrderNotes['note'],
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
