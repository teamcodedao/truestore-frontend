'use client';

import {useMemo} from 'react';

import clsx from 'clsx';
import {getCookie} from 'react-use-cookie';

import type {ProductCartItem} from '@model/product';

import CartItem from './cart-item';

interface CheckoutCartProps {
  onClose: () => void;
}

export default function CheckoutCart({onClose}: CheckoutCartProps) {
  const carts = useMemo<ProductCartItem[]>(() => {
    try {
      return JSON.parse(getCookie('carts'));
    } catch {
      return [];
    }
  }, []);

  return (
    <div className='flex h-screen w-[480px] max-w-full flex-col p-4 sm:p-8'>
      <header className='relative shrink-0 border-b pb-8 sm:pb-10'>
        <h3 className='text-2xl font-bold'>Your shopping cart</h3>
        <button
          aria-label='Close Checkout'
          onClick={onClose}
          className={clsx(
            'absolute right-0 top-0 flex size-10 items-center justify-center rounded-full bg-gray-200 text-white transition',
            'hover:bg-gray-300'
          )}
        >
          <span className='i-carbon-close text-3xl'></span>
        </button>
      </header>

      <div className='mt-5 grow overflow-y-auto'>
        {carts.length ? (
          <div className='space-y-5'>
            {carts.map((cart, index) => (
              <CartItem key={index} cart={cart} />
            ))}
          </div>
        ) : (
          <div>No products in the cart</div>
        )}
      </div>

      <footer className='mt-auto shrink-0 border-t pt-5'>
        <div className='flex justify-between'>
          <span className='text-lg font-bold'>Subtotal:</span>
          <span className='font-medium'>$114.98</span>
        </div>
        <button
          disabled={carts.length === 0}
          className='mt-5 w-full rounded-full bg-black px-5 py-4 text-xl font-bold text-white transition disabled:opacity-50'
        >
          Proceed to Checkout
        </button>
      </footer>
    </div>
  );
}
