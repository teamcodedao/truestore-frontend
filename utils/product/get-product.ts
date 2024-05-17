import {cache} from 'react';
import 'server-only';

import {client} from '@/lib/client';
import {HTTPError} from 'got';
import {notFound} from 'next/navigation';

interface GetProductParams {
  throwNotFound?: boolean;
}

export const getProduct = cache(
  async (id: string, params?: GetProductParams) => {
    try {
      const product = await client
        .get(`v3/products/${id}`)
        .json<{name: string}>();
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
