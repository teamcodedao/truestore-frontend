import clsx from 'clsx';

import {formatCurrency} from '@automattic/format-currency';

export interface PriceProps {
  size?: 'sm' | 'md' | 'lg';
  regular_price?: string;
  /** Fallback to `sale_price` */
  price: string;
}

export default function Price({size = 'lg', regular_price, price}: PriceProps) {
  return (
    <div className="space-x-1">
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
        })}
      >
        {formatCurrency(parseFloat(price), 'USD', {
          stripZeros: true,
        })}
      </span>
    </div>
  );
}
