'use client';

import {PaypalButton2} from '@/components/checkout';
import {transformProductToCart, useCart} from '@model/cart';
import {useProduct, useProductVariation} from '@model/product';

export default function ProductPayment() {
  const product = useProduct();
  const variation = useProductVariation();
  const [{carts, countTotal, subTotal, total}, {addCart, clearCart}] =
    useCart();
  function createCartItem() {
    if (variation) {
      return transformProductToCart({
        product,
        quantity: 1,
        variation,
      });
    }
  }

  return (
    <PaypalButton2
      onCreateCartItem={createCartItem}
      carts={carts}
      countTotal={countTotal}
      subTotal={subTotal}
      total={total}
    />
  );
}
