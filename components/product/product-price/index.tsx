// 'use client';

import {Suspense} from 'react';

import {Price, type PriceProps} from '@/components/ui';
import {getProductVariations} from '@model/product/ssr';

import ProductPrice from './product-price';

export default function SuspenseProductPrice({
  domain,
  id,
  ...props
}: PriceProps & {domain: string; id: string}) {
  return (
    <Suspense
      fallback={
        <Price regular_price={props.regular_price} price={props.price} />
      }
    >
      <ProductPrice
        {...props}
        getProductVariations={getProductVariations(domain, id)}
      />
    </Suspense>
  );
}
