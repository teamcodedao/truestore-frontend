'use client';

import {useState} from 'react';

import clsx from 'clsx';
import {useIntervalWhen} from 'rooks';

import {CheckoutCart} from '@/components/cart';
import {useCart} from '@model/cart';
import offcanvas from '@ui/offcanvas';

interface YourCartProps extends React.ComponentProps<'button'> {}

export default function YourCart({className, ...rest}: YourCartProps) {
  const [{countTotal}] = useCart();

  const [isShake, setIsShake] = useState(false);

  useIntervalWhen(
    () => {
      setIsShake(prev => !prev);
    },
    3000,
    true
  );

  return (
    <button
      aria-label='Cart'
      {...rest}
      className={clsx(className, 'relative', {
        'animate-shake': isShake,
      })}
      onClick={() => {
        offcanvas.show({
          direction: 'right',
          ssr: false,
          content: <CheckoutCart onClose={offcanvas.close} />,
        });
      }}
    >
      <div className='aspect-square overflow-hidden rounded-full bg-orange-400 p-2 text-white'>
        <span className='i-carbon-shopping-cart text-3xl'></span>
      </div>
      <span className='absolute -right-2 -top-2 flex aspect-square min-w-[20px] items-center justify-center overflow-hidden rounded-full border-[2.5px] border-white bg-red-500 p-1.5 text-white'>
        <span suppressHydrationWarning className='text-sm font-medium'>
          {countTotal}
        </span>
      </span>
    </button>
  );
}
