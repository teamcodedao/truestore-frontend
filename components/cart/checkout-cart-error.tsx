'use client';

import clsx from 'clsx';

import {useCart} from '@model/cart';

interface CheckoutCartErrorProps {
  onClose: () => void;
}

export default function CheckoutCartError({onClose}: CheckoutCartErrorProps) {
  const [, {clearCart}] = useCart();

  return (
    <div className="flex h-screen w-[480px] max-w-full flex-col p-4 sm:p-8">
      <header className="relative shrink-0 border-b pb-8 sm:pb-10">
        <h3 className="text-2xl font-bold">Your shopping cart</h3>
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
      <div className="py-5 font-medium">
        <p>
          Oops! We apologize for the inconvenience. It seems that there is an
          error with your shopping cart.
        </p>
        <p className="mt-1">
          If the issue persists, you may try clearing your cart and refreshing
          the page.
        </p>
        <div className="mt-5 flex justify-center ">
          <button
            className="rounded-full bg-red-500 px-10 py-3 text-lg font-extrabold text-white"
            onClick={() => {
              clearCart();
              onClose();
            }}
          >
            Clear your cart
          </button>
        </div>
      </div>
    </div>
  );
}
