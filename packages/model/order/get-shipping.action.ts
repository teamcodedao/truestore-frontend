'use server';

import {HTTPError} from 'got';

import {client} from '@/lib/client';

import type {ShippingMethod} from './typings';

export async function getShipping() {
    const response = client.get(`v3/shipping/zones/1/methods`);

    const [shippingMethod] = await response.json<ShippingMethod[]>();
    
    if (!shippingMethod) {
      const customResponse = await response;
      customResponse.statusCode = 404;
      throw new HTTPError(customResponse);
    }

    return shippingMethod;
}