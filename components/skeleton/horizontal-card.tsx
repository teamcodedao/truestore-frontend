'use client';

export default function HorizontalCardSkeleton() {
  return (
    <div className="flex animate-pulse gap-x-5">
      <div className="size-[120px] shrink-0 bg-gray-200 sm:size-[150px]"></div>
      <div className="grow">
        <div className="h-5 bg-gray-200"></div>
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
