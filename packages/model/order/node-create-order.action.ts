'use server';

import {headers} from 'next/headers';

import {createNodeClient} from '@common/platform/ssr';

import type {CreateOrder, CreateOrderNode, Order} from './typings';

export async function createOrderNode(
  carts: CreateOrder['line_items'],
  {
    shipping_lines,
    meta_data,
    set_paid,
    billing,
    shipping,
    transaction_id,
    payment_method_title,
  }: Pick<
    CreateOrder,
    | 'shipping_lines'
    | 'meta_data'
    | 'billing'
    | 'set_paid'
    | 'shipping'
    | 'transaction_id'
    | 'payment_method_title'
  >,
) {
  const domain = headers().get('host') ?? '';
  const client = await createNodeClient();
  return client
    .post(`api/orders`, {
      json: {
        domain,
        transaction_id: transaction_id,
        orderData: {
          billing,
          shipping,
          payment_method: 'ppcp-gateway',
          set_paid,
          line_items: carts,
          shipping_lines,
          meta_data,
          transaction_id,
          payment_method_title:
            payment_method_title == 'card'
              ? 'Credit or debit cards (PayPal)'
              : 'Paypal',
        },
      } satisfies CreateOrderNode,
    })
    .json<Order>();
}
