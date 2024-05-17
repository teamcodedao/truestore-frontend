'use client';

import {useCallback, useEffect, useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {WheelGesturesPlugin} from 'embla-carousel-wheel-gestures';

import type {ProductImage} from '@/typings/product';

interface ProductCarouselProps {
  images?: ProductImage[];
}

export default function ProductCarousel({images = []}: ProductCarouselProps) {
  const [emblaRef, emblaMainApi] = useEmblaCarousel(
    {
      align: 'center',
    },
    [WheelGesturesPlugin()]
  );

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel(
    {
      containScroll: 'keepSnaps',
      dragFree: true,
      align: 'center',
    },
    [WheelGesturesPlugin()]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
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

  return (
    <div className='embla'>
      <div ref={emblaRef} className='embla__viewport'>
        <div className='embla__container items-start transition-[height] duration-200'>
          {images.map(image => {
            return (
              <div key={image.id} className='embla__slide flex-[1_0_100%]'>
                <img src={image.src} alt='' className='w-full object-contain' />
              </div>
            );
          })}
        </div>
      </div>

      {images.length > 1 && (
        <div className='embla__viewport mt-5' ref={emblaThumbsRef}>
          <div className='embla__container gap-x-2'>
            {images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  aria-label='Thumbnail'
                  role='radio'
                  aria-checked={index === selectedIndex}
                  className='embla__slide size-[70px] min-w-0 shrink-0 border border-gray-100 transition hover:border-orange-100 aria-checked:border-orange-300'
                  onClick={() => onThumbClick(index)}
                >
                  <img src={image.src} alt='' className='h-full object-cover' />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
