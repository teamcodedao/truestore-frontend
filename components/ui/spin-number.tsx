'use client';

import {useState} from 'react';

import {cn} from '@/lib/cn';

interface SpinNumberProps {
  value?: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: Size;
}

export default function SpinNumber({
  min = 1,
  max,
  onChange,
  size = 'base',
  ...rest
}: SpinNumberProps) {
  const [value, setNumber] = useState(parseInt(String(rest.value ?? 1), 10));

  function updateValue(value: number) {
    setNumber(value);
    onChange(value);
  }

  function increase() {
    const newValue = (() => {
      if (typeof max === 'number') {
        return Math.min(max, value + 1);
      }
      return value + 1;
    })();

    updateValue(newValue);
  }

  function decrease() {
    const newValue = Math.max(min, value - 1);
    updateValue(newValue);
  }

  return (
    <div
      className={cn(
        'flex shrink-0 items-stretch rounded border border-gray-300 md:w-fit',
        '[&_span[class*=i-]]:multi-[`text-xl;text-gray-500;`]',
      )}
    >
      <button aria-label="Decrease" onClick={decrease} className="pl-2">
        <span className="i-radix-icons-minus translate-y-1"></span>
      </button>
      <span
        className={cn(
          'w-full self-center px-2 py-3 text-center font-medium text-slate-500 md:w-fit',
          {
            'text-base min-w-[30px]': size === 'base',
            'text-base min-w-[24px]': size === 'sm',
          },
        )}
      >
        {value}
      </span>
      <button aria-label="Incecrease" onClick={increase} className="pr-2">
        <span className="i-radix-icons-plus translate-y-1"></span>
      </button>
    </div>
  );
}
