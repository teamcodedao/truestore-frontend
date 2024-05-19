import {Suspense} from 'react';

import {Price, PriceProps} from '@/components/common';
import {getProductVariations} from '@model/product';

import ProductPrice from './product-price';

export default function SuspenseProductPrice({
  id,
  ...props
}: PriceProps & {id: string}) {
  const promise = getProductVariations(id);

  return (
    <Suspense
      fallback={
        <Price regular_price={props.regular_price} price={props.price} />
      }
    >
      <ProductPrice {...props} getVariationPromise={promise} />
    </Suspense>
  );
}
