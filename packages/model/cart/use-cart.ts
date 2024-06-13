'use client';

import {useMemo} from 'react';

import currency from 'currency.js';

import useLocalStorage from '@rehooks/local-storage';

import type {CartItem} from './typings';

const STORAGE_NAME = 'carts';

export function useCart() {
  const [carts, writeCarts, clearCart] = useLocalStorage<CartItem[]>(
    STORAGE_NAME,
    [],
  );

  const countTotal = useMemo(() => {
    return carts.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }, [carts]);

  const subTotal = useMemo(() => {
    return carts.reduce((total, item) => {
      return currency(total).add(
        currency(item.variation.sale_price || item.variation.price).multiply(
          item.quantity,
        ),
      ).value;
    }, 0);
  }, [carts]);

  const shippingTotal = useMemo(() => {
    return carts.reduce((max, item) => {
      const shippingValue = item.variation.shipping_value;
      return shippingValue !== undefined && shippingValue > max
        ? shippingValue
        : max;
    }, 0);
  }, [carts]);

  const total = useMemo(() => {
    return currency(subTotal).add(shippingTotal).value;
  }, [subTotal, shippingTotal]);

  function getInCart(cart: CartItem) {
    return carts.find(c => {
      if (
        c.product.id === cart.product.id &&
        c.variation.id === cart.variation.id
      ) {
        return true;
      }

      return false;
    })!;
  }

  function addCart(cart: CartItem) {
    const cartIndex = carts.indexOf(getInCart(cart));
    let newCarts = [...carts];

    if (cartIndex === -1) {
      newCarts = [...carts, cart];
    } else {
      newCarts[cartIndex].quantity += cart.quantity;
    }

    writeCarts(newCarts);

    return newCarts;
  }

  function deleteCart(cart: CartItem) {
    const cartIndex = carts.indexOf(getInCart(cart));
    const newCarts = carts.filter((_, index) => {
      return cartIndex !== index;
    });

    writeCarts(newCarts);

    return newCarts;
  }

  function setCartQuantity(cart: CartItem, quantity: number) {
    const cartIndex = carts.indexOf(getInCart(cart));

    const newCarts = carts.map((cart, index) => {
      if (cartIndex === index) {
        return {
          ...cart,
          quantity,
        };
      }

      return cart;
    });

    writeCarts(newCarts);

    return newCarts;
  }

  return [
    {carts, countTotal, subTotal, shippingTotal, total},
    {addCart, setCartQuantity, deleteCart, clearCart},
  ] as const;
}
