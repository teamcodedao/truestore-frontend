'use server';

import {unstable_cache as cache} from 'next/cache';

import {HTTPError} from 'got';

import {client} from '@/lib/client';

import type {ShippingMethod} from './typings';

export const getShipping = cache(async () => {
  const response = client.get(`v3/shipping/zones/1/methods`);

  const [shippingMethod] = await response.json<ShippingMethod[]>();

  if (!shippingMethod) {
    const customResponse = await response;
    customResponse.statusCode = 404;
    throw new HTTPError(customResponse);
  }

  return shippingMethod;
});
