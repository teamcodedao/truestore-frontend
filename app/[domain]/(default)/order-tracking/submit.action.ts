'use server';

import {headers} from 'next/headers';
import {redirect} from 'next/navigation';

import {retrieveOrder} from '@model/order/ssr';

export interface FormValues {
  email: string;
  order_number: string;
}

export async function submit({email, order_number}: FormValues) {
  const domain = headers().get('host') ?? '';
  const order = await retrieveOrder(domain, order_number, email);
  redirect(`/orders/${order.id}?key=${order.order_key}`);
}
