import 'server-only';
import {unstable_cache as cache} from 'next/cache';

import {createPlatformClient} from '@common/platform/ssr';
import type {ProductVariation} from '@model/product';

async function fetchVariations(
  domain: string,
  id: string,
  page: number,
  perPage: number,
) {
  const client = await createPlatformClient(domain);
  return client
    .get(`v3/products/${id}/variations`, {
      searchParams: {
        page,
        per_page: perPage,
      },
    })
    .json<ProductVariation[]>();
}

export const getProductVariations = cache(
  async (domain: string, id: string) => {
    let page = 1;
    const perPage = 100;

    try {
      let res = await fetchVariations(domain, id, page, perPage);
      let variations = res;
      while (res.length >= perPage) {
        page += 1;
        res = await fetchVariations(domain, id, page, perPage);
        variations = variations.concat(res);
      }
      return variations;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  [],
  {
    revalidate: 180,
    tags: ['product','all'],
  },
);
