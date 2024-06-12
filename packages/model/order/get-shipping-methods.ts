import {unstable_cache as cache} from 'next/cache';

import {HTTPError} from 'ky';

import {createPlatformClient} from '@common/platform/ssr';

import type {ShippingMethod} from './typings';

export const getShippingMethods = cache(
  async (domain: string, zone: number) => {
    const client = await createPlatformClient(domain);
    const [shippingMethod] = await client
      .get(`v3/shipping/zones/${zone}/methods`, {
        hooks: {
          afterResponse: [
            async (request, options, response) => {
              if (response.ok) {
                const shippingMethods: ShippingMethod[] = await response
                  .clone()
                  .json();
                if (shippingMethods.length === 0) {
                  throw new HTTPError(
                    new Response(response.body, {
                      status: 404,
                      headers: response.headers,
                    }),
                    request,
                    options,
                  );
                }
              }
              return response;
            },
          ],
        },
      })
      .json<ShippingMethod[]>();

    return shippingMethod;
  },
  [],
  {
    revalidate: 86400,
    tags: ['shipping-methods', 'all'],
  },
);
