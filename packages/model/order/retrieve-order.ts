import 'server-only';
import {unstable_cache as cache} from 'next/cache';

import {HTTPError} from 'got';

import {client} from '@/lib/client';

import type {Order} from './typings';

export const getRetrieveOrder = cache(
  async (id: string | number, addtionalKey: string) => {
    const response = client.get(`v3/orders/${id}`);
    const order = await response.json<Order>();

    if (
      order.order_key === addtionalKey ||
      order.billing.email === addtionalKey
    ) {
      return order;
    }

    const customResponse = await response;
    customResponse.statusCode = 404;
    throw new HTTPError(customResponse);
  }
);
