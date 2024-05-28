import 'server-only';
import {unstable_cache as cache} from 'next/cache';

import {client} from '@/lib/client';
import type {ProductVariation} from '@model/product';

function fetchVariations(id: string, page: number, perPage: number) {
  return client
    .get(`v3/products/${id}/variations`, {
      searchParams: {
        page,
        per_page: perPage,
      },
    })
    .json<ProductVariation[]>();
}

export const getProductVariations = cache(async (id: string) => {
  let page = 1;
  const perPage = 100;

  try {
    let res = await fetchVariations(id, page, perPage);
    let variations = res;

    while (res.length >= perPage) {
      page += 1;
      res = await fetchVariations(id, page, perPage);
      variations = variations.concat(res);
    }

    return variations;
  } catch (error) {
    console.error(error);
    return [];
  }
});
