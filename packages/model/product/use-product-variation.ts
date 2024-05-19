'use client';

import {useMemo} from 'react';

import type {ProductVariation} from './typings';
import {useParamsVariation} from './use-params-variation';

export function useProductVariation(productVariations: ProductVariation[]) {
  const paramVariation = useParamsVariation();

  return useMemo(() => {
    return productVariations.find(item => {
      const checkColor = !!item.attributes.find(
        attr => attr.name === 'COLOR' && attr.option === paramVariation?.COLOR
      );

      if (checkColor) {
        return !!item.attributes.find(
          attr =>
            attr.name === 'SIZE ( US )' &&
            attr.option === paramVariation?.['SIZE ( US )']
        );
      }

      return false;
    });
  }, [paramVariation, productVariations]);
}
