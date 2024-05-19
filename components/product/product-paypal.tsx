'use client';
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const initialOptions = {
    "clientId": "AZOjMz0V8b4VoY9-gz-pWuVfvHFEXbU1z0aD01ROSo-5M8kdFW0CaxB7o1ss-aX8s1mwlPSK_9aEpG_X",
    currency: "USD",
    intent: "capture",
};

export default function ProductPaypal() {
    function createOrder(data, actions) {
        return fetch("/my-server/create-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart: [
                    {
                        id: "YOUR_PRODUCT_ID",
                        quantity: "YOUR_PRODUCT_QUANTITY",
                    },
                ],
            }),
        })
        .then((response) => response.json())
        .then((order) => order.id);
    }

    function onApprove(data, actions) {
        return fetch("/my-server/capture-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
        .then((response) => response.json())
        .then((orderData) => {
            const name = orderData.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
        });
    }

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </PayPalScriptProvider>
    );
}
