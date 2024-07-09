'use client';

import {useState} from 'react';

import {useIntervalWhen} from 'rooks';

import {CheckoutCart, CheckoutCartError} from '@/components/cart';
import {cn} from '@/lib/cn';
import {useDevice} from '@/lib/use-device';
import {useCart} from '@model/cart';
import offcanvas from '@ui/offcanvas';

interface YourCartProps extends React.ComponentProps<'button'> {
  size?: Size;
}

export default function YourCart({
  className,
  size = 'base',
  ...rest
}: YourCartProps) {
  const device = useDevice();
  const [{countTotal}] = useCart();

  const [isShake, setIsShake] = useState(false);

  useIntervalWhen(
    () => {
      setIsShake(prev => !prev);
    },
    3000,
    device !== 'mobile',
  );

  return (
    <button
      aria-label="Cart"
      {...rest}
      className={cn(className, 'relative', {
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
          className={cn('i-carbon-shopping-cart', {
            'text-2xl': size === 'base',
            'text-xl': size === 'sm',
          })}
        ></span>
      </div>
      <span
        className={cn(
          'absolute -top-2 left-5 flex items-center justify-center overflow-hidden rounded-full border-[2.5px] border-white bg-red-500 text-white',
          {
            'min-w-[20px]': size === 'base',
            'min-w-[15px]': size === 'sm',
            'p-1': countTotal > 9,
            'p-1.5': countTotal <= 9,
            'py-0': countTotal > 99 || device === 'mobile',
            'aspect-square': countTotal < 100,
          },
        )}
      >
        <span suppressHydrationWarning className="text-sm font-medium">
          {countTotal > 99 && device === 'mobile' ? '99+' : countTotal}
        </span>
      </span>
    </button>
  );
}
