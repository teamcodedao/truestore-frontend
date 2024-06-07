'use client';

import {HorizontalCardSkeleton} from '@/components/skeleton';
import {randomNumber} from '@/lib/random';

export default function CheckoutInformationSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-7 space-y-3 divide-y divide-gray-300 [&>*:not(:first-child)]:pt-3">
        {Array.from({length: randomNumber(3, 5)}).map((_, index) => (
          <HorizontalCardSkeleton key={index} />
        ))}
      </div>
      <hr />
      <div className="my-7 space-y-5">
        {Array.from({length: 2}).map((_, index) => (
          <div key={index} className="flex justify-between">
            <div className="h-5 w-36 bg-gray-200"></div>
            <div className="h-5 w-20 bg-gray-200"></div>
          </div>
        ))}
      </div>
      <hr />
      <div className="mt-7">
        <div className="flex justify-between">
          <div className="h-5 w-24 bg-gray-200"></div>
          <div className="h-5 w-28 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
