'use client';

import {getCookie} from 'react-use-cookie';

import {PaypalButtonSkeleton} from '@/components/skeleton';
import {createOrder, ProductCartItem, updateOrder} from '@model/order';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: process.env.NEXT_PUBLIC_PAYPAL_CURRENCY,
};

interface OrderItem {
  product_id: any;
  quantity: any;
  variation_id?: any;
}

function PaypalButton() {
  const [{isPending}] = usePayPalScriptReducer();

  const createOrderPaypal = async (data: any, actions: any) => {
    try {
      let carts: ProductCartItem[] = [];
      carts = getCookie('carts') ? JSON.parse(getCookie('carts')) : [];
      
      const order = await createOrder(
        carts.map((item: ProductCartItem): OrderItem => {
          const orderItem: OrderItem = {
            product_id: item.product.id,
            quantity: item.quantity,
          };

          if (item.variation) {
            orderItem.variation_id = item.variation.id;
          }

          return orderItem;
        })
      );

      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: order.total,
            },
            custom_id: order.id,
          },
        ],
      });
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const order = await actions.order.capture();
      const billingDetails = {
        first_name: order.payer.name.given_name,
        last_name: order.payer.name.surname,
        email: order.payer.email_address,
        address_1: order.purchase_units[0].shipping.address.address_line_1,
        address_2:
          order.purchase_units[0].shipping.address.address_line_2 || '',
        city: order.purchase_units[0].shipping.address.admin_area_2,
        state: order.purchase_units[0].shipping.address.admin_area_1,
        postcode: order.purchase_units[0].shipping.address.postal_code,
        country: order.purchase_units[0].shipping.address.country_code,
        phone: order.payer.phone?.phone_number?.national_number || '',
      };

      const wooOrderID = order.purchase_units[0].custom_id;
      const updatedOrder = await updateOrder(wooOrderID, billingDetails);
      console.log('WooCommerce Order updated:', updatedOrder);
    } catch (error) {
      console.error(
        'Error capturing order or updating WooCommerce order:',
        error
      );
    }
  };

  return (
    <>
      <PayPalButtons createOrder={createOrderPaypal} onApprove={onApprove} />
      {isPending && <PaypalButtonSkeleton />}
    </>
  );
}

export default function ProductPaypal() {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PaypalButton />
    </PayPalScriptProvider>
  );
}
