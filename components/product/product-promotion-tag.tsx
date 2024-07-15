'use client';

import {Promotion} from '@/components/ui';
import {useProduct, useProductVariation} from '@model/product';

export default function ProductPromotionTag() {
  const product = useProduct();
  const variation = useProductVariation();

  let regular_price = product.regular_price;
  let price = product.price;

  if (variation) {
    regular_price = variation.regular_price || regular_price;
    price = variation.price || price;
  }

  if (!regular_price) {
    return null;
  }

  return (
    price < regular_price && (
      <Promotion
        value={Math.floor(((regular_price - price) / regular_price) * 100)}
      />
    )
  );
}
