import {unstable_cache as cache} from 'next/cache';
import {notFound} from 'next/navigation';

import {HTTPError} from 'ky';

import {createPlatformClient} from '@common/platform/ssr';
import type {Product} from '@model/product';

interface GetProductParams {
  throwNotFound?: boolean;
}

export const getProduct = cache(
  async (domain: string, slug: string, params?: GetProductParams) => {
    const client = await createPlatformClient(domain);
    try {
      const [product] = await client
        .get(`v3/products`, {
          searchParams: {
            slug,
            per_page: 1,
          },
          hooks: {
            afterResponse: [
              async (request, options, response) => {
                if (response.ok) {
                  const products: Product[] = await response.clone().json();
                  if (products.length === 0) {
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
        .json<Product[]>();

      return product;
    } catch (error) {
      if (error instanceof HTTPError) {
        if (params?.throwNotFound && error.response.status === 404) {
          notFound();
        }
      }
      throw error;
    }
  },
  [],
  {
    revalidate: 86400,
    tags: ['product', 'all'],
  },
);
