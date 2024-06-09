'use client';

import clsx from 'clsx';

import {randomNumber} from '@/lib/random';

import HorizontalCardSkeleton from './horizontal-card';

interface OrderDetailPageSkeletonProps extends React.ComponentProps<'div'> {}

export default function OrderDetailPageSkeleton({
  className,
}: OrderDetailPageSkeletonProps) {
  return (
    <div
      className={clsx(
        className,
        'animate-pulse border-t border-gray-200 py-10 [--aside-size:80px] sm:[--aside-size:120px] lg:[--aside-size:150px]',
      )}
    >
      <div className="space-y-5">
        {Array.from({length: randomNumber(1, 3)}).map((_, index) => (
          <HorizontalCardSkeleton
            key={index}
            className="max-sm:[--aside-size:80px]"
          />
        ))}
      </div>
      <div className="mt-10 flex gap-x-5 border-t border-gray-200 pt-10">
        <div className="invisible w-[--aside-size] max-sm:hidden"></div>
        <div className="grow">
          <div className="grid grid-cols-2 gap-5 *:multi-[space-y-4]">
            <div className="h-20">
              <div className="h-5 w-32 bg-gray-200"></div>
              <div className="h-10 bg-gray-100"></div>
            </div>
            <div className="h-20">
              <div className="h-5 w-40 bg-gray-200"></div>
              <div className="h-10 bg-gray-100"></div>
            </div>
            <div className="h-32">
              <div className="h-5 w-28 bg-gray-200"></div>
              <div className="h-20 bg-gray-100"></div>
            </div>
            <div className="h-32">
              <div className="h-5 w-48 bg-gray-200"></div>
              <div className="h-20 bg-gray-100"></div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="space-y-5">
              {Array.from({length: 4}).map((_, index) => (
                <div key={index} className="flex justify-between">
                  <div className="h-5 w-36 bg-gray-200"></div>
                  <div className="h-5 w-20 bg-gray-200"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
