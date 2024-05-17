'use client';

import clsx from 'clsx';
import {useState} from 'react';

interface ProductAttributeProps {
  title: string;
  options: string[];
}

export default function ProductAttribute({
  title,
  options,
}: ProductAttributeProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <h5 className='font-bold'>{title}</h5>
      <div className='mt-2 flex flex-wrap gap-2 text-sm'>
        {options.map((option, index) => (
          <button
            key={option}
            role='radio'
            aria-checked={selected === index}
            className={clsx(
              'rounded border border-gray-300 px-4 py-1.5 font-medium text-slate-500 transition',
              'aria-checked:multi-[`bg-yellow-400;text-black;border-yellow-500`]'
            )}
            onClick={() => setSelected(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
