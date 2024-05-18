'use client';

import clsx from 'clsx';

export interface ProductAttributeProps {
  name: string;
  title?: string;
  options: string[];
  selectedIndex?: number;
  onSelect?: (value: string) => void;
}

export function ProductAttribute({
  name,
  title,
  options = [],
  selectedIndex,
  onSelect,
}: ProductAttributeProps) {
  return (
    <div>
      <h5 className='font-bold capitalize'>{(title || name).toLowerCase()}</h5>
      <div className='mt-2 flex flex-wrap gap-2 text-sm'>
        {options.map((option, index) => (
          <button
            key={option}
            role='radio'
            aria-checked={selectedIndex === index}
            className={clsx(
              'rounded border border-gray-300 px-4 py-1.5 font-medium text-slate-500 transition',
              'aria-checked:multi-[`bg-yellow-400;text-black;border-yellow-500`]'
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
