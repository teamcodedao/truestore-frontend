'use client';

import {useMemo} from 'react';

import {useProduct} from './product-context';
import {useParamsVariation} from './use-params-variation';

export function useProductVariation() {
  const product = useProduct();
  const paramVariation = useParamsVariation();

  return useMemo(() => {
    if (!paramVariation) {
      return undefined;
    }
    return product.variations.find(item => {
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
  }, [paramVariation, product.variations]);
}
