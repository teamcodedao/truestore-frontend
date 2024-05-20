import {cookies} from 'next/headers';

import type {ProductCartItem, UpdateProductCartItem} from './typings';

export class CartStore {
  public static addCart(cart: ProductCartItem) {
    let carts = CartStore.get();

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

    return carts;
  }

  public static updateCartQuantity(item: UpdateProductCartItem) {
    const carts = CartStore.get();

    const cart = carts.find(c => {
      if (
        c.product.id === item.product_id &&
        c.variantion.id === item.variantion_id
      ) {
        return true;
      }

      return false;
    });

    if (cart) {
      cart.quantity = item.quantity;
      carts[carts.indexOf(cart)] = cart;
    }

    return [cart, carts] as const;
  }

  public static get() {
    let carts: ProductCartItem[] = [];
    try {
      if (cookies().get('carts')) {
        carts = JSON.parse(cookies().get('carts')?.value || '');
      }
    } catch (error) {
      console.error(error);
    }

    return carts;
  }
}
