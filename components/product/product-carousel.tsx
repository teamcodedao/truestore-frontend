'use client';

import {use, useCallback, useEffect, useMemo, useState} from 'react';

import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import {WheelGesturesPlugin} from 'embla-carousel-wheel-gestures';

import {usePrevNextButtons} from '@/lib/embla-carousel';
import {useImgproxy} from '@common/platform';
import {
  type ProductImage,
  type ProductVariation,
  useProductVariation,
} from '@model/product';

interface ProductCarouselProps {
  images?: ProductImage[];
  variationPromise: Promise<ProductVariation[]>;
}

export default function ProductCarousel({
  variationPromise,
  ...restProps
}: ProductCarouselProps) {
  const productVariations = use(variationPromise);
  const variation = useProductVariation(productVariations);

  const imgproxy = useImgproxy();

  const variationCurrentImg = variation?.image.src;

  const images = useMemo(() => {
    const images = (restProps.images ?? []).map(image => image.src);
    if (variationCurrentImg) {
      images.push(variationCurrentImg);
    }
    return [...new Set(images)];
  }, [restProps.images, variationCurrentImg]);

  const [emblaRef, emblaMainApi] = useEmblaCarousel({}, [
    WheelGesturesPlugin(),
  ]);

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel(
    {
      containScroll: 'keepSnaps',
      dragFree: true,
    },
    [WheelGesturesPlugin()],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [controlState, controlActions] = usePrevNextButtons(emblaMainApi);

  const onThumbClick = useCallback<(index: number) => void>(
    index => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    emblaMainApi.on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  useEffect(() => {
    if (variationCurrentImg) {
      const index = images.indexOf(variationCurrentImg);
      if (index !== -1) {
        onThumbClick(index);
      }
    }
  }, [images, onThumbClick, variationCurrentImg]);

  return (
    <div className="embla">
      <div ref={emblaRef} className="embla__viewport">
        <div className="embla__container">
          {images.map((image, index) => {
            return (
              <div
                key={index}
                className="embla__slide aspect-square flex-[0_0_100%] bg-slate-100"
              >
                <img
                  src={imgproxy(image)}
                  alt=""
                  className="size-full object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>

      {images.length > 1 && (
        <div
          className={clsx(
            'relative mt-5',
            '[&>button]:multi-[`absolute;top-1/2;-translate-y-1/2;text-white;bg-black/60;flex;items-center;justify-center;text-3xl`]',
            '[&>button[disabled]]:opacity-50',
          )}
        >
          <div ref={emblaThumbsRef} className="embla__viewport ">
            <div className="embla__container gap-x-2">
              {images.map((image, index) => {
                return (
                  <button
                    key={index}
                    aria-label="Thumbnail"
                    role="radio"
                    aria-checked={index === selectedIndex}
                    className="embla__slide size-[70px] min-w-0 shrink-0 border border-gray-100 transition hover:border-orange-200 aria-checked:border-orange-400"
                    onClick={() => onThumbClick(index)}
                  >
                    <img
                      src={imgproxy(image, ['rs:fit:200'])}
                      alt=""
                      className="size-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <button
            className="left-1"
            aria-label="Previous"
            disabled={controlState.prevDisabled}
            onClick={() => controlActions.prev()}
          >
            <span className="i-radix-icons-chevron-left"></span>
          </button>
          <button
            className="right-1"
            aria-label="Next"
            disabled={controlState.nextDisabled}
            onClick={() => controlActions.next()}
          >
            <span className="i-radix-icons-chevron-right"></span>
          </button>
        </div>
      )}
    </div>
  );
}
