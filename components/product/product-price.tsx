'use client';

import {Price, type PriceProps} from '@/components/ui';
import {type ProductVariation, useProductVariation} from '@model/product';

export default function ProductPrice({
  variations,
  ...props
}: PriceProps & {variations: ProductVariation[]}) {
  let regular_price = props.regular_price;
  let price = props.price;

  const variation = useProductVariation(variations);

  if (variation) {
    regular_price = variation.regular_price || regular_price;
    price = variation.sale_price || variation.price || price;
  }

  return <Price {...props} regular_price={regular_price} price={price} />;
}
