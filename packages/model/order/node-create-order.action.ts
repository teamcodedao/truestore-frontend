'use server';

import {headers} from 'next/headers';

import {createNodeClient} from '@common/platform/ssr';

import type {CreateOrderNode, Order} from './typings';

export async function createOrderNode({
  payment_method,
  shipping_lines,
  meta_data,
  set_paid,
  billing,
  shipping,
  transaction_id,
  payment_method_title,
  total,
  shipping_total,
  line_items,
}: CreateOrderNode['orderData']) {
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
          payment_method,
          set_paid,
          line_items,
          shipping_lines,
          meta_data,
          transaction_id,
          total,
          shipping_total,
          payment_method_title:
            payment_method_title == 'card'
              ? 'Credit or debit cards (PayPal)'
              : 'Paypal',
        },
      } satisfies CreateOrderNode,
    })
    .json<Order>();
}
