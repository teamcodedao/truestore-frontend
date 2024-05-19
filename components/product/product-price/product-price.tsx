'use client';

import {use} from 'react';

import {Price, type PriceProps} from '@/components/common';
import {ProductVariation, useProductVariation} from '@model/product';

export default function ProductPrice({
  getVariationPromise,
  ...props
}: PriceProps & {getVariationPromise: Promise<ProductVariation[]>}) {
  const productVariations = use(getVariationPromise);

  let regular_price = props.regular_price;
  let price = props.price;

  const variation = useProductVariation(productVariations);

  if (variation) {
    regular_price = variation.regular_price || regular_price;
    price = variation.sale_price || variation.price || price;
  }

  return <Price {...props} regular_price={regular_price} price={price} />;
}
