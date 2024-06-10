import {notFound} from 'next/navigation';

import {HTTPError} from 'ky';

import {createPlatformClient} from '@common/platform/ssr';

import type {Order} from './typings';

interface RetrieveProductParams {
  throwNotFound?: boolean;
}

export async function retrieveOrder(
  domain: string,
  id: string | number,
  additionalKey: string,
  params?: RetrieveProductParams,
) {
  const client = await createPlatformClient(domain);
  try {
    const order = await client
      .get(`v3/orders/${id}`, {
        cache: 'no-store',
        hooks: {
          afterResponse: [
            async (request, options, response) => {
              if (response.ok) {
                const order: Order = await response.clone().json();

                if (
                  order.order_key === additionalKey ||
                  order.billing.email === additionalKey
                ) {
                  return response;
                }

                throw new HTTPError(
                  new Response(response.body, {
                    status: 404,
                    headers: response.headers,
                  }),
                  request,
                  options,
                );
              }

              return response;
            },
          ],
        },
      })
      .json<Order>();

    return order;
  } catch (error) {
    if (error instanceof HTTPError) {
      if (params?.throwNotFound && error.response.status === 404) {
        notFound();
      }
    }
    throw error;
  }
}
