'use client';

import clsx from 'clsx';
import {useState} from 'react';

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
    return setQuantity(quantity => {
      if (typeof max === 'number') {
        return Math.min(max, quantity + 1);
      }

      return quantity + 1;
    });
  };

  const decrease = () => {
    return setQuantity(quantity => Math.max(min, quantity - 1));
  };

  return (
    <div className='flex gap-x-3'>
      <div
        className={clsx(
          'flex shrink-0 items-center border border-gray-300 px-2',
          '[&_span[class*=i-]]:multi-[`text-xl;text-gray-500`]'
        )}
      >
        <button aria-label='Decrease quantity' onClick={decrease}>
          <span className='i-radix-icons-minus translate-y-1'></span>
        </button>
        <span className='min-w-[40px] text-center text-lg font-medium'>
          {quantity}
        </span>
        <button aria-label='Incecrease quantity' onClick={increase}>
          <span className='i-radix-icons-plus translate-y-1'></span>
        </button>
      </div>
      <div className='flex grow gap-x-3 *:multi-[`rounded;text-white;font-bold;px-5;py-3;flex-1;flex;items-center;justify-center;gap-x-2;transition`]'>
        <button className='bg-black hover:bg-black/80'>
          <span className='i-carbon-shopping-cart-plus text-xl'></span>
          <span>Add to</span>
          cart
        </button>
        <button className='bg-orange-600 hover:bg-orange-500'>
          <span className='i-carbon-wallet text-xl'></span>
          <span>Buy now</span>
        </button>
      </div>
    </div>
  );
}
