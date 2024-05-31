import 'server-only';
import {unstable_cache as cache} from 'next/cache';

import {HTTPError} from 'got';

import {client} from '@/lib/client';

import type {ShippingMethod} from './typings';

export const getShippingMethods = cache(async (zone: number) => {
  const response = client.get(`v3/shipping/zones/${zone}/methods`);

  const [shippingMethod] = await response.json<ShippingMethod[]>();

  if (!shippingMethod) {
    const customResponse = await response;
    customResponse.statusCode = 404;
    throw new HTTPError(customResponse);
  }

  return shippingMethod;
});
