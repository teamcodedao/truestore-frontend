'use server';

import {cookies} from 'next/headers';

import type {ProductCartItem} from '@model/product';

export async function addCart(cart: ProductCartItem) {
  let carts: ProductCartItem[] = [];
  try {
    if (cookies().get('carts')) {
      carts = JSON.parse(cookies().get('carts')?.value || '');
    }
  } catch (error) {
    console.error(error);
  }

  const indexExist = carts.findIndex(c => {
    if (
      c.product.id === cart.product.id &&
      c.variantion.id === cart.variantion.id
    ) {
      return true;
    }

    return false;
  });

  if (indexExist === -1) {
    carts = [...carts, cart];
  } else {
    carts[indexExist].quantity += cart.quantity;
  }

  cookies().set({
    name: 'carts',
    value: JSON.stringify(carts),
    path: '/',
    maxAge: 1 * 30 * 24 * 60 * 60, // 1 month
  });

  return carts;
}
