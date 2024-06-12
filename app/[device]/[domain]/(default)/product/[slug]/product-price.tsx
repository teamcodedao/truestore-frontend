import {use} from 'react';

import {ProductPrice} from '@/components/product';
import type {PriceProps} from '@/components/ui';
import {type ProductVariation} from '@model/product';

export default function SuspenseProductPrice({
  variationPromise,
  ...restProps
}: PriceProps & {variationPromise: Promise<ProductVariation[]>}) {
  const variations = use(variationPromise);

  return <ProductPrice {...restProps} variations={variations} />;
}
