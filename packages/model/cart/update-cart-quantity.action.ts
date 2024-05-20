'use server';

import {cookies} from 'next/headers';

import type {UpdateProductCartItem} from '@model/product';

import {CartStore} from './cart.store';

export async function updateCartQuantity(item: UpdateProductCartItem) {
  const [cart, carts] = CartStore.updateCartQuantity(item);

  cookies().set({
    name: 'carts',
    value: JSON.stringify(carts),
    path: '/',
    maxAge: 1 * 30 * 24 * 60 * 60, // 1 month
  });

  return cart;
}
