'use client';

import {useState} from 'react';

import dayjs from 'dayjs';
import {useIntervalWhen} from 'rooks';

import {cn} from '@/lib/cn';

interface CountdownProps extends React.ComponentProps<'span'> {
  date: dayjs.ConfigType;
  whenEnd?: {
    text?: string;
    className?: string;
  };
}

export default function Countdown({
  date,
  className,
  whenEnd,
  ...rest
}: CountdownProps) {
  const [meanTime, setMeanTime] = useState(dayjs(date).diff(dayjs(), 'second'));

  useIntervalWhen(
    () => {
      setMeanTime(meanTime => meanTime - 1);
    },
    1000,
    meanTime > 0,
  );

  return (
    <span
      {...rest}
      className={cn(className, {
        [whenEnd?.className ?? '']: meanTime < 1,
      })}
      suppressHydrationWarning
    >
      {meanTime > 1
        ? `${Math.floor(meanTime / 60)
            .toString()
            .padStart(2, '0')}:${Math.floor(meanTime % 60)
            .toString()
            .padStart(2, '0')}`
        : (whenEnd?.text ?? '')}
    </span>
  );
}
