import {cn} from '@/lib/cn';

interface CarouselThumbSkeletonProps {
  aspect?: Aspect;
}

export default function CarouselThumbSkeleton({
  aspect = 'square',
}: CarouselThumbSkeletonProps) {
  return (
    <div className="animate-pulse space-y-4">
      <div
        className={cn('w-full bg-gray-100', {
          'aspect-square': aspect === 'square',
          'aspect-video': aspect === 'video',
        })}
        style={{
          aspectRatio:
            aspect !== 'square' && aspect !== 'video' ? aspect : undefined,
        }}
      ></div>
      <div
        className={cn(
          'relative flex gap-2.5 overflow-hidden',
          'after:multi-[`absolute;size-6;bg-gray-200;rounded;left-2;top-1/2;-translate-y-1/2`]',
          'before:multi-[`absolute;size-6;bg-gray-200;rounded;right-2;top-1/2;-translate-y-1/2`]',
        )}
      >
        {Array.from({length: 10}).map((_, index) => (
          <div
            key={index}
            className="aspect-square size-[68px] shrink-0 bg-gray-100"
          ></div>
        ))}
      </div>
    </div>
  );
}
