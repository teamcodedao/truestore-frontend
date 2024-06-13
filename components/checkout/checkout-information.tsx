'use client';

import Link from 'next/link';

import currency from 'currency.js';

import {useImgproxy} from '@common/platform';
import {useCart} from '@model/cart';

export default function CheckoutInformation() {
  const imgproxy = useImgproxy();
  const [{carts, subTotal, total, shippingTotal}] = useCart();

  return (
    <>
      {carts.length > 0 ? (
        <div className="mb-7 space-y-3 divide-y divide-gray-300 sm:ml-7 [&>*:not(:first-child)]:pt-3">
          {carts.map((cart, index) => {
            return (
              <div key={index} className="flex gap-x-5">
                <div className="size-[120px] shrink-0 bg-white sm:size-[150px]">
                  <img
                    src={imgproxy(cart.variation.image ?? '', ['rs:fit:200'])}
                    alt=""
                    className="object-contain object-center"
                  />
                </div>
                <div>
                  <Link href={cart.variation.link}>
                    <h4
                      className="line-clamp-2 font-semibold"
                      title={cart.product.name}
                    >
                      {cart.product.name}
                    </h4>
                  </Link>
                  <div className="flex items-center justify-between gap-x-2">
                    <div className="mt-1 space-x-1 text-sm font-medium text-gray-900">
                      {!!cart.variation.regular_price && (
                        <span className="text-gray-500 line-through">
                          {currency(cart.variation.regular_price).format()}
                        </span>
                      )}
                      <span>
                        {currency(
                          cart.variation.sale_price || cart.variation.price,
                        ).format()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      x{cart.quantity}
                    </span>
                  </div>
                  <div className="mt-2">
                    {cart.variation.attributes.map((attr, index) => (
                      <span
                        key={index}
                        className="block text-sm font-medium text-gray-500"
                      >
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mb-7 w-[--w-base] max-w-full">
          Your shopping cart is empty. Please add items before proceeding to
          checkout.
        </div>
      )}
      <hr className="-mr-8" />
      <dl className="my-7 space-y-6 text-sm font-medium text-gray-500 sm:ml-7">
        <div className="flex justify-between gap-x-2">
          <dt>Subtotal</dt>
          <dd className="text-gray-900">{currency(subTotal).format()}</dd>
        </div>
        <div className="flex justify-between gap-x-2">
          <dt>Secured Shipping</dt>
          <dd className="text-gray-900">{currency(shippingTotal).format()}</dd>
        </div>
      </dl>
      <hr className="-mr-8" />
      <div className="mt-8 flex justify-between gap-x-2 font-semibold text-gray-900 sm:ml-7">
        <span>Total</span>
        <span>{currency(total).format()}</span>
      </div>
    </>
  );
}
