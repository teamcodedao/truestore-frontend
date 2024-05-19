import {Suspense} from 'react';

import {getProductVariations} from '@model/product';

import ProductPrice, {
  ProductPriceProps,
  ImplProductPrice,
} from './product-price';

export default function SuspenseProductPrice({
  id,
  ...props
}: ProductPriceProps & {id: string}) {
  const promise = getProductVariations(id);

  return (
    <Suspense
      fallback={
        <ImplProductPrice
          regular_price={props.regular_price}
          price={props.price}
        />
      }
    >
      <ProductPrice {...props} getVariationPromise={promise} />
    </Suspense>
  );
}
