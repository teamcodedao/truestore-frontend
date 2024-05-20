'use server';

import {cookies} from 'next/headers';

import type {ProductCartItem} from '@model/product';

import {CartStore} from './cart.store';

export async function addCart(cart: ProductCartItem) {
  const carts = CartStore.addCart(cart);

  cookies().set({
    name: 'carts',
    value: JSON.stringify(carts),
    path: '/',
    maxAge: 1 * 30 * 24 * 60 * 60, // 1 month
  });

  return carts;
}
