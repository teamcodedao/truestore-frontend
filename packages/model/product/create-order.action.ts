"use server";

import { client } from "@/lib/client";


export const createOrder = async (cart: any) => {
  return client
    .post(`v3/orders`, {
      json: {
        payment_method: "paypal",
        payment_method_title: "Paypal",
        set_paid: false,
        line_items: cart,
      },
    })
    .json();
}
