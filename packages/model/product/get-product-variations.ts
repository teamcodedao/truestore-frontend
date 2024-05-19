import 'server-only';

import {client} from '@/lib/client';

import type {ProductVariation} from '@model/product';

export const getProductVariations = async (id: string) => {
  try {
    return client
      .get(`v3/products/${id}/variations`)
      .json<ProductVariation[]>();
  } catch (error) {
    return [];
  }
};