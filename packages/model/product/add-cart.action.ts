'use server';

import type {ProductCartItem} from '@model/product';

export async function addCart(cart: ProductCartItem) {
  console.log('server ne', cart);
}
