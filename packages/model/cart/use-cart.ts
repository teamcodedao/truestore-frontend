'use client';

import {useMemo} from 'react';

import useLocalStorage from '@rehooks/local-storage';

import type {CartItem} from './typings';

const STOREAGE_NAME = 'carts';

export function useCart() {
  const [carts, writeCarts, clearCart] = useLocalStorage<CartItem[]>(
    STOREAGE_NAME,
    []
  );

  const countTotal = useMemo(() => {
    return carts.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }, [carts]);

  const subTotal = useMemo(() => {
    return carts.reduce((total, item) => {
      return (
        total +
        item.quantity *
          parseFloat(item.variation.sale_price || item.variation.price)
      );
    }, 0);
  }, [carts]);

  function addCart(cart: CartItem) {
    const cartIndex = carts.findIndex(c => {
      if (
        c.product.id === cart.product.id &&
        c.variation.id === cart.variation.id
      ) {
        return true;
      }

      return false;
    });

    let newNewCarts = [...carts];

    if (cartIndex === -1) {
      newNewCarts = [...carts, cart];
    } else {
      newNewCarts[cartIndex].quantity += cart.quantity;
    }

    writeCarts(newNewCarts);

    return newNewCarts;
  }

  function deleteCart(cart: CartItem) {
    //
  }

  return [
    {carts, countTotal, subTotal},
    {addCart, clearCart},
  ] as const;
}
