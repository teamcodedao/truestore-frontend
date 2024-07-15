import currency from 'currency.js';

import {cn} from '@/lib/cn';

export interface PriceProps {
  size?: 'sm' | 'md' | 'lg';
  horizontal?: boolean;
  regular_price?: number;
  /** Fallback to `sale_price` */
  price: number;
}

export default function Price({
  size = 'lg',
  horizontal,
  regular_price,
  price,
}: PriceProps) {
  return (
    <div
      className={cn('flex gap-x-1', {
        'flex-col-reverse justify-center items-end forest:items-center *:multi-[`inline-block;max-w-[150px];break-all`]':
          horizontal,
      })}
    >
      {!!regular_price && (
        <span
          suppressHydrationWarning
          className={cn(
            'font-medium text-slate-500 forest:text-black line-through',
            {
              'text-xl': size === 'lg',
              'text-base': size === 'md',
              'text-sm': size === 'sm',
            },
          )}
        >
          {currency(regular_price).format()}
        </span>
      )}
      <span
        suppressHydrationWarning
        className={cn('font-bold text-red-500 forest:text-black', {
          'text-2xl': size === 'lg',
          'text-lg': size === 'md',
          'text-base': size === 'sm',
          'text-xl': size === 'sm' && !regular_price,
        })}
      >
        {currency(price).format()}
      </span>
    </div>
  );
}
