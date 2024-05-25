'use client';

import {useEffect} from 'react';
import {useSearchParams} from 'next/navigation';

import {useCart} from '@model/cart';
import {fbpixel} from '@tracking/fbpixel';
import {firebaseTracking} from '@tracking/firebase';

export default function CheckoutTracking() {
  const searchParams = useSearchParams();

  const [{carts, countTotal, subTotal}] = useCart();

  useEffect(() => {
    fbpixel.trackInitiateCheckout({
      content_category: 'Uncategorized',
      content_ids: carts.map(cart => String(cart.product.id)),
      content_name: carts.map(cart => cart.product.name).join(' - '),
      currency: 'USD',
      num_items: countTotal,
      value: subTotal,

      // Custom properties
      content_type: 'product',
      category_name: 'Uncategorized',
      subtotal: subTotal,
      contents: carts.map(cart => ({
        id: cart.variation.id,
        quantity: cart.quantity,
      })),
    });
  }, [carts, countTotal, subTotal]);

  useEffect(() => {
    fetch('/api/ip')
      .then(res => res.json())
      .then(res => {
        const userId = res.ip;

        firebaseTracking.trackingCheckout({
          userId,
          carts,
        });
      });
  }, [carts, searchParams]);

  return null;
}
