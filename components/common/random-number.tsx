'use client';

import {useState} from 'react';
import {useIntervalWhen} from 'rooks';

import {randomNumber} from '@/lib/random';

interface RandomNumberProps extends React.ComponentProps<'span'> {
  interval?: number;
  min?: number;
  max?: number;
}

export default function RandomNumber({
  interval = 1000,
  min = 0,
  max = 100,
  ...rest
}: RandomNumberProps) {
  const [number, setNumber] = useState(() => Math.ceil(randomNumber(min, max)));

  useIntervalWhen(
    () => {
      setNumber(Math.ceil(randomNumber(min, max)));
    },
    interval,
    true
  );

  return (
    <span {...rest} suppressHydrationWarning>
      {number}
    </span>
  );
}
