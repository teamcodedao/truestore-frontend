'use server';

import {client} from '@/lib/client';

import type {CreateOrder, Order} from './typings';

export async function createOrder(carts: CreateOrder['line_items'], shipping_lines: CreateOrder['shipping_lines']) {
  return client
    .post(`v3/orders`, {
      json: {
        payment_method: 'paypal',
        payment_method_title: 'Paypal',
        set_paid: false,
        line_items: carts,
        shipping_lines
      } satisfies CreateOrder,
    })
    .json<Order>();
}
