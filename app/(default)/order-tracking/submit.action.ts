'use server';

import {redirect} from 'next/navigation';

import {retrieveOrder} from '@model/order';

export interface FormValues {
  email: string;
  order_number: string;
}

export async function submit({email, order_number}: FormValues) {
  const order = await retrieveOrder(order_number, email);
  redirect(`/orders/${order.id}?key=${order.order_key}`);
}
