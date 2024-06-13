'use client';

import {use} from 'react';

import {PaypalButton} from '@/components/checkout';
import {transformProductToCart} from '@model/cart';
import {
  type Product,
  type ProductVariation,
  useProductVariation,
} from '@model/product';

interface ProductPaymentProps {
  product: Product;
  variationPromise: Promise<ProductVariation[]>;
}

export default function ProductPayment({
  product,
  variationPromise,
}: ProductPaymentProps) {
  const variations = use(variationPromise);
  const variation = useProductVariation(variations);
  // TOTO: Quantity
  function createCartItem() {
    if (variation) {
      return transformProductToCart({
        product,
        quantity: 1,
        variation,
      });
    }
  }

  return <PaypalButton onCreateCartItem={createCartItem} />;
}
