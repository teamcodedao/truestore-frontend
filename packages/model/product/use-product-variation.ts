'use client';

import {useMemo} from 'react';

import type {ProductVariation} from './typings';
import {useParamsVariation} from './use-params-variation';

export function useProductVariation(productVariations: ProductVariation[]) {
  const paramVariation = useParamsVariation();

  return useMemo(() => {
    if (!paramVariation) {
      return undefined;
    }
    return productVariations.find(item => {
      for (const [key, value] of Object.entries(paramVariation)) {
        const exists = item.attributes.find(
          attr => attr.name === key && attr.option === value,
        );
        if (!exists) {
          return false;
        }
      }

      return true;
    });
  }, [paramVariation, productVariations]);
}
