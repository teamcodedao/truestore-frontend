'use client';

import {Price, type PriceProps} from '@/components/ui';
import {useProductVariation} from '@model/product';

export default function ProductPrice(props: PriceProps) {
  let regular_price = props.regular_price;
  let price = props.price;

  const variation = useProductVariation();

  if (variation) {
    regular_price = variation.regular_price || regular_price;
    price = variation.price || price;
  }

  return <Price {...props} regular_price={regular_price} price={price} />;
}
