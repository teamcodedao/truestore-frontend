'use client';

import {useState} from 'react';

import clsx from 'clsx';

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
      className={clsx(
        'flex shrink-0 items-stretch border border-gray-300',
        '[&_span[class*=i-]]:multi-[`text-xl;text-gray-500`]',
      )}
    >
      <button aria-label="Decrease" onClick={decrease} className="pl-2">
        <span className="i-radix-icons-minus translate-y-1"></span>
      </button>
      <span
        className={clsx('self-center text-center  font-medium', {
          'text-lg min-w-[30px]': size === 'base',
          'text-base min-w-[24px]': size === 'sm',
        })}
      >
        {value}
      </span>
      <button aria-label="Incecrease" onClick={increase} className="pr-2">
        <span className="i-radix-icons-plus translate-y-1"></span>
      </button>
    </div>
  );
}
