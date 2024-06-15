'use client';

import {PaypalButton} from '@/components/checkout';
import {transformProductToCart} from '@model/cart';
import {useProduct, useProductVariation} from '@model/product';

export default function ProductPayment() {
  const product = useProduct();
  const variation = useProductVariation();
  function createCartItem() {
    if (variation) {
      return transformProductToCart({
        product,
        quantity: 1,
        variation,
      });
    }
  }

  // return <PaypalButton onCreateCartItem={createCartItem} />;

  //TODO
  return null;
}
