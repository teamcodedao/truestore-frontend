import clsx from 'clsx';

export default function CarouselThumbSkeleton() {
  return (
    <div className="animate-pulse space-y-2.5">
      <div className="aspect-square w-full bg-gray-200"></div>
      <div
        className={clsx(
          'relative flex gap-2.5 overflow-hidden',
          'after:multi-[`absolute;size-6;bg-gray-300;rounded;left-2;top-1/2;-translate-y-1/2`]',
          'before:multi-[`absolute;size-6;bg-gray-300;rounded;right-2;top-1/2;-translate-y-1/2`]',
        )}
      >
        {Array.from({length: 10}).map((_, index) => (
          <div
            key={index}
            className="aspect-square size-[68px] shrink-0 bg-gray-200"
          ></div>
        ))}
      </div>
    </div>
  );
}
