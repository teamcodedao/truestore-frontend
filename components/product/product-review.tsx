'use client';

import Image from 'next/image';

import {HtmlReplaceImgproxy} from '@/components/common';
import verifiedImg from '@/images/verified.svg';
import {cn} from '@/lib/cn';
import {type ProductReview} from '@model/product';

export interface ProductReviewProps {
  reviews: ProductReview[];
  layout?: 'default' | 'masonry';
}

export default function ProductReview({
  reviews,
  layout = 'default',
}: ProductReviewProps) {
  if (layout === 'masonry') {
    return (
      <div data-empty={reviews.length === 0} className="">
        {reviews.length > 0 ? (
          <div>
            <div className="flex items-center gap-x-10">
              <div className="shrink-0">
                <p className="text-2xl font-medium">
                  <span className="text-6xl font-bold">5</span> / 5.0
                </p>
                <div className="text-xl text-yellow">
                  {Array.from({length: 5}).map((_, index) => (
                    <span key={index} className="i-carbon-star-filled"></span>
                  ))}
                </div>
                <div className="text-center text-sm font-medium">
                  {reviews.length} reviews
                </div>
              </div>
              <div className="hidden items-center gap-1 text-sm font-medium sm:flex">
                <span>True to size</span>
                <div className="ml-10 h-2 w-60 bg-yellow sm:ml-24"></div>
                <span>100%</span>
              </div>
            </div>
            <div className="mt-5 columns-3xs gap-3">
              {reviews.map((review, index) => {
                return (
                  <article
                    key={index}
                    className={cn(
                      'rounded-lg bg-white px-4 py-3 break-inside-avoid shadow-lg',
                      {
                        'mt-3': index,
                      },
                    )}
                  >
                    <h5 className="font-bold">{review.reviewer_name}</h5>
                    <figure className="flex items-center gap-2">
                      <div className="text-lg text-yellow">
                        {Array.from({length: 5}).map((_, idx) => (
                          <span
                            key={idx}
                            className="i-carbon-star-filled"
                          ></span>
                        ))}
                      </div>
                      <figcaption className="-translate-y-0.5 text-sm font-medium text-gray-400">
                        True to size
                      </figcaption>
                    </figure>
                    <div className="text-sm">
                      <HtmlReplaceImgproxy html={review.review} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="pt-6 font-medium">
            No reviews yet for this product
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      data-empty={reviews.length === 0}
      className="w-full space-y-5 divide-y lg:space-y-10 [&>div:not(:first-child)]:pt-7"
    >
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="flex flex-wrap">
            <div className="flex-[0_0_200px] shrink-0">
              <p className="font-semibold">{review.reviewer_name}</p>
              <p className="-ml-px flex items-center gap-1 text-sm">
                <Image src={verifiedImg} alt="" />
                <span>Verified Buyer</span>
              </p>
            </div>
            <article className="flex-[1_1_400px] text-base [&_img]:inline">
              <HtmlReplaceImgproxy html={review.review} />
            </article>
          </div>
        ))
      ) : (
        <div className="pt-6 font-medium">No reviews yet for this product</div>
      )}
    </div>
  );
}
