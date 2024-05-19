import {unstable_cache as cache} from 'next/cache';
import 'server-only';

import {client} from '@/lib/client';
import {HTTPError} from 'got';
import {notFound} from 'next/navigation';

import type {Product} from '@model/product';

interface GetProductParams {
  throwNotFound?: boolean;
}

export const getProduct = cache(
  async (slug: string, params?: GetProductParams) => {
    try {
      const response = client.get(`v3/products`, {
        searchParams: {
          slug,
          per_page: 1,
        },
      });

      const [product] = await response.json<Product[]>();

      if (!product) {
        const customResponse = await response;
        customResponse.statusCode = 404;
        throw new HTTPError(customResponse);
      }

      return product;
    } catch (error) {
      if (error instanceof HTTPError) {
        if (params?.throwNotFound && error.response.statusCode === 404) {
          notFound();
        }
      }
      throw error;
    }
  }
);
