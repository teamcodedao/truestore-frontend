'use client';

import {use} from 'react';
import Image from 'next/image';
import {notFound} from 'next/navigation';

import dayjs from 'dayjs';

import {Badge} from '@/components/ui';
import paypalImg from '@/images/payments/paypal.webp';
import {formatCurrency} from '@automattic/format-currency';
import {useImgproxy} from '@common/platform';
import type {Order} from '@model/order';

interface OrderDetailsProps {
  retrieveOrderPromise: Promise<Order>;
}

export default function OrderDetails({
  retrieveOrderPromise,
}: OrderDetailsProps) {
  const order = use(retrieveOrderPromise);

  const imgproxy = useImgproxy();

  if (!order) {
    notFound();
  }

  const subtotal = order.line_items.reduce((acc, item) => {
    return acc + Number(item.subtotal);
  }, 0);

  return (
    <div>
      <div className="mt-10 border-t border-gray-200">
        <h2 className="sr-only">Your order</h2>
        <h3 className="sr-only">Items</h3>

        {order.line_items.map(product => (
          <div
            key={product.id}
            className="flex space-x-6 border-b border-gray-200 py-10"
          >
            <img
              src={imgproxy(product.image.src, 'rs:fit:200')}
              alt=""
              className="size-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:size-40"
            />
            <div className="flex flex-auto flex-col">
              <div>
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                {product.meta_data.map((meta, index) => (
                  <p key={index} className="mt-2 text-sm text-gray-600">
                    {meta.display_value}
                  </p>
                ))}
              </div>
              <div className="mt-6 flex flex-1 items-end">
                <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                  <div className="flex">
                    <dt className="font-medium text-gray-900">Quantity</dt>
                    <dd className="ml-2 text-gray-700">{product.quantity}</dd>
                  </div>
                  <div className="flex pl-4 sm:pl-6">
                    <dt className="font-medium text-gray-900">Price</dt>
                    <dd className="ml-2 text-gray-700">
                      {formatCurrency(product.price, 'USD', {
                        stripZeros: true,
                      })}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ))}

        <div className="sm:ml-40 sm:pl-6">
          <h3 className="sr-only">Your information</h3>

          <h4 className="sr-only">Addresses</h4>
          <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <dt className="font-medium text-gray-900">Shipping address</dt>
              <dd className="mt-2 text-gray-700">
                <address className="break-all not-italic">
                  <span className="block">
                    {order.shipping.first_name} {order.shipping.last_name}
                  </span>
                  <span className="block">{order.shipping.phone}</span>
                  <span className="block">
                    {order.shipping.address_1 || order.shipping.address_2}
                  </span>
                  <span className="block">
                    {order.shipping.state}, {order.shipping.postcode},{' '}
                    {order.shipping.country}
                  </span>
                </address>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Billing address</dt>
              <dd className="mt-2 text-gray-700">
                <address className="break-all not-italic">
                  <span className="block">
                    {order.billing.first_name} {order.billing.last_name}
                  </span>
                  <span className="block">{order.billing.phone}</span>
                  <span className="block">{order.billing.email}</span>
                  <span className="block">
                    {order.billing.address_1 || order.billing.address_2}
                  </span>
                  <span className="block">
                    {order.billing.state}, {order.billing.postcode},{' '}
                    {order.billing.country}
                  </span>
                </address>
              </dd>
            </div>
          </dl>

          <h4 className="sr-only">Payment</h4>
          <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
            <div>
              <dt className="font-medium text-gray-900">Payment method</dt>
              <dd className="mt-2 text-gray-700">
                <Badge
                  color={
                    order.status === 'processing'
                      ? 'processing'
                      : order.status === 'completed'
                        ? 'success'
                        : 'default'
                  }
                >
                  {order.status}
                </Badge>
                <div className="mt-3">
                  {order.payment_method == 'ppcp-gateway' ? (
                    <div className="flex gap-2">
                      <Image
                        src={paypalImg}
                        alt=""
                        width={50}
                        className="object-contain"
                      />
                      <div className="space-y-1">
                        <p className="font-bold">
                          {order.payment_method_title || 'Paypal'}
                        </p>
                        <p className="font-medium">
                          Financial technology company
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p>{order.payment_method_title}</p>
                    </>
                  )}
                </div>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Customer Note</dt>
              <dd className="mt-2 text-gray-700">
                <p className="italic">{order.customer_note || 'empty'}</p>
              </dd>
            </div>
          </dl>

          <h3 className="sr-only">Summary</h3>

          <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
            <div className="flex justify-between">
              <dt className="font-medium text-gray-900">Created Date</dt>
              <dd className="text-gray-700">
                {dayjs(order.date_created).format('MMM D, YYYY')}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-gray-900">Subtotal</dt>
              <dd className="text-gray-700">
                {formatCurrency(subtotal, 'USD', {
                  stripZeros: true,
                })}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-gray-900">Secured Shipping</dt>
              <dd className="text-gray-700">
                {formatCurrency(Number(order.shipping_total), 'USD', {
                  stripZeros: true,
                })}
              </dd>
            </div>
            <div className="flex justify-between font-bold">
              <dt className="text-gray-900">Total</dt>
              <dd className="text-gray-900">
                {formatCurrency(Number(order.total), 'USD', {stripZeros: true})}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
