'use client';

import Link from 'next/link';

import clsx from 'clsx';

import {formatCurrency} from '@automattic/format-currency';
import {useCart} from '@model/cart';

import GroupCart from './group-cart';

interface CheckoutCartProps {
  onClose: () => void;
}

export default function CheckoutCart({onClose}: CheckoutCartProps) {
  const [{carts, countTotal, subTotal}] = useCart();

  return (
    <div className='flex h-screen w-[480px] max-w-full flex-col p-4 sm:p-8'>
      <header className='relative shrink-0 border-b pb-8 sm:pb-10'>
        <h3 className='text-2xl font-bold'>
          Your shopping cart{' '}
          {countTotal > 0 ? <span>({countTotal})</span> : null}
        </h3>
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

      <GroupCart carts={carts} />

      <footer className='mt-auto shrink-0 border-t pt-5'>
        <div className='flex justify-between'>
          <span className='text-lg font-bold'>Subtotal:</span>
          <span className='font-medium'>
            {formatCurrency(subTotal, 'USD', {
              stripZeros: true,
            })}
          </span>
        </div>
        <Link
          href='/checkout'
          aria-disabled={carts.length === 0}
          className={clsx(
            'mt-5 block w-full rounded-full bg-black px-5 py-4 text-center text-xl font-bold text-white transition',
            'select-none aria-disabled:multi-[`bg-opacity-70`]'
          )}
        >
          Proceed to Checkout
        </Link>
      </footer>
    </div>
  );
}
