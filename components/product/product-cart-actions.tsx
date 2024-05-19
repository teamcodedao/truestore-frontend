'use client';

import {useState} from 'react';

import clsx from 'clsx';

interface ProductCartActionsProps {
  min?: number;
  max?: number;
}

export default function ProductCartActions({
  min = 1,
  max,
}: ProductCartActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity(quantity => {
      if (typeof max === 'number') {
        return Math.min(max, quantity + 1);
      }

      return quantity + 1;
    });
  };

  const decrease = () => {
    setQuantity(quantity => Math.max(min, quantity - 1));
  };

  return (
    <div className='flex gap-x-3'>
      <div
        className={clsx(
          'flex shrink-0 items-stretch border border-gray-300',
          '[&_span[class*=i-]]:multi-[`text-xl;text-gray-500`]'
        )}
      >
        <button
          aria-label='Decrease quantity'
          onClick={decrease}
          className='pl-2'
        >
          <span className='i-radix-icons-minus translate-y-1'></span>
        </button>
        <span className='min-w-[30px] self-center text-center text-lg font-medium'>
          {quantity}
        </span>
        <button
          aria-label='Incecrease quantity'
          onClick={increase}
          className='pr-2'
        >
          <span className='i-radix-icons-plus translate-y-1'></span>
        </button>
      </div>
      <div
        className={clsx(
          'flex grow gap-x-3',
          '*:multi-[`rounded;text-white;font-bold;px-2;py-3;flex-1;flex;items-center;justify-center;gap-x-2;transition;whitespace-nowrap`]',
          '[&_span[class*=i-]]:multi-[`text-xl`]',
          'sm:*:multi-[`px-5`]'
        )}
      >
        <button className='bg-black hover:bg-black/80'>
          <span className='i-carbon-shopping-cart-plus'></span>
          <span>Add to cart</span>
        </button>
        <button className='bg-orange-600 hover:bg-orange-500'>
          <span className='i-carbon-wallet'></span>
          <span>Buy now</span>
        </button>
      </div>
    </div>
  );
}
