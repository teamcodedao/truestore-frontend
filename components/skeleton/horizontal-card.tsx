'use client';

import {cn} from '@/lib/cn';

interface HorizontalCardSkeletonProps extends React.ComponentProps<'div'> {}

export default function HorizontalCardSkeleton({
  className,
}: HorizontalCardSkeletonProps) {
  return (
    <div
      className={cn(
        className,
        'flex animate-pulse gap-x-5 [--aside-size:120px] sm:[--aside-size:150px]',
      )}
    >
      <div className="size-[--aside-size] shrink-0 bg-gray-200"></div>
      <div className="grow">
        <div className="h-5 max-w-lg bg-gray-200"></div>
        <div className="mt-1 h-5 w-12 bg-gray-200"></div>
        <div className="mt-2 flex justify-between">
          <div className="h-5 w-32 bg-gray-200"></div>
          <div className="h-5 w-10 bg-gray-200"></div>
        </div>
        <div className="mt-2 flex gap-x-2">
          <div className="h-5 w-48 bg-gray-200"></div>
          <div className="h-5 w-20 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
