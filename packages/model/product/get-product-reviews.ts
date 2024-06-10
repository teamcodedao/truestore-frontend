import {unstable_cache as cache} from 'next/cache';

import ms from 'ms';

import {createPlatformClient} from '@common/platform/ssr';

import type {ProductReview} from './typings';

export const getProductReviews = cache(
  async (domain: string, id: string | number) => {
    const client = await createPlatformClient(domain);
    try {
      const {product_reviews = []} = await client
        .get(`v2/products/${id}/reviews`)
        .json<{product_reviews: ProductReview[]}>();

      return product_reviews;
    } catch (error) {
      return [];
    }
  },
  [],
  {
    revalidate: ms('1 hour') / 1000,
    tags: ['reviews', 'all'],
  },
);
