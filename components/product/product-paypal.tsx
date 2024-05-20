'use client';

import {createOrder, updateOrder} from '@model/product';
import {PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js';

const initialOptions = {
  clientId:
    'AZOjMz0V8b4VoY9-gz-pWuVfvHFEXbU1z0aD01ROSo-5M8kdFW0CaxB7o1ss-aX8s1mwlPSK_9aEpG_X',
  currency: 'USD',
};

const ProductPaypal = () => {
  const createOrderPaypal = async (data: any, actions: any) => {
    try {
      const order = await createOrder([
        {
          product_id: 2005,
          variation_id: 2030,
          quantity: 1,
        },
      ]);
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
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons createOrder={createOrderPaypal} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default ProductPaypal;
