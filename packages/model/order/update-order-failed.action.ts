'use server';

import {headers} from 'next/headers';

import {createPlatformClient} from '@common/platform/ssr';

import type {Order} from './typings';

export async function updateOrderFailed(orderId: string, status: string) {
  const domain = headers().get('host') ?? '';
  const client = await createPlatformClient(domain);

  return client
    .put(`v3/orders/${orderId}`, {
      json: {
        status: status,
      },
    })
    .json<Order>();
}
