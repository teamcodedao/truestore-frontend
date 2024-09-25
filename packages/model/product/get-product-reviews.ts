import {unstable_cache as cache} from 'next/cache';

import {createPlatformClient} from '@common/platform/ssr';

import type {ProductReview} from './typings';

export const getProductReviews = cache(
  async (domain: string, id: string | number) => {
    const client = await createPlatformClient(domain);
    try {
      const res = await client
        .get(`v2/products/${id}/reviews`)
        .json<ProductReview[]>();
      return res;
    } catch (error) {
      return [];
    }
  },
  [],
  {
    revalidate: 86400,
    tags: ['reviews', 'all'],
  },
);
