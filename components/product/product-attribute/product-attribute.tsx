'use client';

import {startTransition, useEffect} from 'react';

import {cn} from '@/lib/cn';

export interface ProductAttributeProps {
  name: string;
  title?: string;
  options: string[];
  selectedIndex?: number;
  size?: Size;
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
              },
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
