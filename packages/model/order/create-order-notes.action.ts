"use server";

import {client} from "@/lib/client";

import type {CreateOrderNotes, OrderNotes} from "./typings";

export async function createOrderNotes(
  orderId: string,
  note: CreateOrderNotes['note']
) {
  return client
    .post(`v3/orders/${orderId}/notes`, {
      json: {
        note,
      } satisfies CreateOrderNotes,
    })
    .json<OrderNotes>();
}
