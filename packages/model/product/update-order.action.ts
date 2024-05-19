"use server";

import { client } from "@/lib/client";


export const updateOrder = async (orderId:any, billingDetails:any) => {
  return client
    .put(`v3/orders/${orderId}`, {
      json: {
        billing: billingDetails,
        shipping: billingDetails,
        set_paid: true,
      },
    })
    .json();
}
