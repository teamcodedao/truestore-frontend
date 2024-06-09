import clsx from 'clsx';

import {formatCurrency} from '@automattic/format-currency';

export interface PriceProps {
  size?: 'sm' | 'md' | 'lg';
  horizontal?: boolean;
  regular_price?: string;
  /** Fallback to `sale_price` */
  price: string;
}

export default function Price({
  size = 'lg',
  horizontal,
  regular_price,
  price,
}: PriceProps) {
  return (
    <div
      className={clsx('flex gap-x-1', {
        'flex-col-reverse justify-center items-end *:multi-[`inline-block;max-w-[150px];break-all`]':
          horizontal,
      })}
    >
      {!!regular_price && (
        <span
          suppressHydrationWarning
          className={clsx('font-medium text-slate-500 line-through', {
            'text-xl': size === 'lg',
            'text-base': size === 'md',
            'text-sm': size === 'sm',
          })}
        >
          {formatCurrency(parseFloat(regular_price), 'USD', {
            stripZeros: true,
          })}
        </span>
      )}
      <span
        suppressHydrationWarning
        className={clsx('font-bold text-red-500', {
          'text-2xl': size === 'lg',
          'text-lg': size === 'md',
          'text-base': size === 'sm',
          'text-xl': size === 'sm' && !regular_price,
        })}
      >
        {formatCurrency(parseFloat(price), 'USD', {
          stripZeros: true,
        })}
      </span>
    </div>
  );
}
