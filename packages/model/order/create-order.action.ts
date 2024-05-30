'use server';

import {client} from '@/lib/client';

import type {CreateOrder, Order} from './typings';

export async function createOrder(carts: CreateOrder['line_items'], shipping_lines: CreateOrder['shipping_lines'], meta_data: CreateOrder['meta_data']) {
  return client
    .post(`v3/orders`, {
      json: {
        payment_method: 'ppcp-gateway',
        set_paid: false,
        line_items: carts,
        shipping_lines,
        meta_data
      } satisfies CreateOrder,
    })
    .json<Order>();
}
