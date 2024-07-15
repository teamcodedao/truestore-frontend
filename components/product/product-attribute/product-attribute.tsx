'use client';

import {startTransition, useEffect} from 'react';

import {cn} from '@/lib/cn';

export interface ProductAttributeProps {
  name: string;
  title?: string;
  options: string[];
  selectedIndex?: number;
  size?: Size | 'xl';
  onSelect?: (value: string) => void;
}

export function ProductAttribute({
  name,
  title,
  options = [],
  selectedIndex,
  size = 'base',
  onSelect,
}: ProductAttributeProps) {
  useEffect(() => {
    if (selectedIndex === -1) {
      startTransition(() => {
        onSelect?.(options[0]);
      });
    }
  }, [onSelect, options, selectedIndex]);

  return (
    <div>
      <h5
        className={cn('capitalize', {
          'font-bold': size === 'base',
          'text-sm font-medium': size === 'sm',
          'text-base font-bold': size === 'xl',
        })}
      >
        {(title || name).toLowerCase()}
      </h5>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option, index) => (
          <button
            key={option}
            role="radio"
            aria-checked={selectedIndex === index}
            className={cn(
              'rounded border border-gray-300 font-medium text-slate-500 transition',
              'aria-checked:multi-[`bg-primary-400;text-black;border-primary-500`]',
              {
                'px-4 py-1.5 text-sm': size === 'base',
                'px-3 py-1 text-xs': size === 'sm',
                'px-5 py-3 text-sm': size === 'xl',
              },
              'forest:multi-[rounded-full;bg-white;text-black;] forest:aria-checked:multi-[`bg-black;text-white;border-black`]',
            )}
            onClick={() => onSelect?.(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
