import 'server-only';

import {client} from '@/lib/client';
import type {ProductVariation} from '@model/product';

export const getProductVariations = async (id: string) => {
  let page = 1;
  const perPage = 100;

  try {
    let res = await client
      .get(`v3/products/${id}/variations`, {
        searchParams: {
          page,
          per_page: perPage,
        },
      })
      .json<ProductVariation[]>();

    let variations = res;
    while (res.length >= perPage) {
      page += 1;
      res = await client
        .get(`v3/products/${id}/variations`, {
          searchParams: {
            page,
            per_page: perPage,
          },
        })
        .json<ProductVariation[]>();
      variations = variations.concat(res);
    }
    return variations;
  } catch (error) {
    console.error(error);
    return [];
  }
};
