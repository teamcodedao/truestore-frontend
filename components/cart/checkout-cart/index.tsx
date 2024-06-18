'use client';

import Link from 'next/link';

import clsx from 'clsx';
import currency from 'currency.js';

import {CheckoutPayment} from '@/components/checkout';
import {useCart} from '@model/cart';
import {firebaseTracking} from '@tracking/firebase';

import GroupCart from './group-cart';

interface CheckoutCartProps {
  onClose: () => void;
}

export default function CheckoutCart({onClose}: CheckoutCartProps) {
  const [{carts, countTotal, subTotal, shippingTotal, total}] = useCart();

  return (
    <div className="flex h-screen w-[480px] max-w-full flex-col p-4 sm:p-8">
      <header className="relative shrink-0 border-b pb-8 sm:pb-10">
        <h3 className="text-2xl font-bold">
          Your shopping cart{' '}
          {countTotal > 0 ? <span>({countTotal})</span> : null}
        </h3>
        <button
          aria-label="Close Checkout"
          onClick={onClose}
          className={clsx(
            'absolute right-0 top-0 flex size-10 items-center justify-center rounded-full bg-gray-200 text-white transition',
            'hover:bg-gray-300',
          )}
        >
          <span className="i-carbon-close text-3xl"></span>
        </button>
      </header>

      <GroupCart />

      <footer className="mt-auto shrink-0 border-t pt-5">
        <div className="flex justify-between">
          <span className="text-lg">Subtotal</span>
          <span className="font-medium">{currency(subTotal).format()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg">Secured Shipping</span>
          <span className="font-medium">
            {currency(shippingTotal).format()}
          </span>
        </div>
        <div className="flex justify-between font-bold">
          <span className="text-lg">Total</span>
          <span>{currency(total).format()}</span>
        </div>
        <Link
          href="/checkout?from=checkout-cart"
          aria-disabled={carts.length === 0}
          className={clsx(
            'mt-5 block w-full rounded bg-black px-5 py-4 text-center text-xl font-bold text-white transition',
            'select-none aria-disabled:multi-[`bg-opacity-80;pointer-events-none`]',
          )}
        >
          Proceed to Checkout
        </Link>
        <div className="mt-0">
          <div className="relative my-2 text-center after:multi-[`absolute;w-full;h-0.5;bg-gray-200;left-0;top-1/2;-translate-y-1/2`]">
            <span className="relative z-10 inline-block bg-white px-3 text-sm font-medium">
              or quick checkout with
            </span>
          </div>
          <CheckoutPayment
            onClick={async () => {
              // firebaseTracking.trackingClickPaypal(
              //   carts[0].product.id,
              //   'PAYPAL3',
              // );
            }}
          />
        </div>
      </footer>
    </div>
  );
}
