'use client';

import {useState} from 'react';

import clsx from 'clsx';
import {useIntervalWhen} from 'rooks';

import {CheckoutCart, CheckoutCartError} from '@/components/cart';
import {useCart} from '@model/cart';
import offcanvas from '@ui/offcanvas';

interface YourCartProps extends React.ComponentProps<'button'> {
  size?: 'default' | 'small';
}

export default function YourCart({
  className,
  size = 'default',
  ...rest
}: YourCartProps) {
  const [{countTotal}] = useCart();

  const [isShake, setIsShake] = useState(false);

  useIntervalWhen(
    () => {
      setIsShake(prev => !prev);
    },
    3000,
    true,
  );

  return (
    <button
      aria-label="Cart"
      {...rest}
      className={clsx(className, 'relative', {
        'animate-shake': isShake,
      })}
      onClick={() => {
        offcanvas.show({
          direction: 'right',
          ssr: false,
          fallback: <CheckoutCartError onClose={offcanvas.close} />,
          content: <CheckoutCart onClose={offcanvas.close} />,
        });
      }}
    >
      <div className="aspect-square overflow-hidden rounded-full bg-orange-400 p-2 text-white">
        <span
          className={clsx('i-carbon-shopping-cart', {
            'text-2xl': size === 'default',
            'text-xl': size === 'small',
          })}
        ></span>
      </div>
      <span
        className={clsx(
          'absolute -right-2 -top-2 flex aspect-square items-center justify-center overflow-hidden rounded-full border-[2.5px] border-white bg-red-500 p-1.5 text-white',
          {
            'min-w-[20px]': size === 'default',
            'min-w-[15px]': size === 'small',
          },
        )}
      >
        <span suppressHydrationWarning className="text-sm font-medium">
          {countTotal}
        </span>
      </span>
    </button>
  );
}
