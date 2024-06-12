'use client';

import Image from 'next/image';

import {HtmlReplaceImgproxy} from '@/components/common';
import verifiedImg from '@/images/verified.svg';
import {type ProductReview} from '@model/product';

export interface ProductReviewProps {
  reviews: ProductReview[];
}

export default function ProductReview({reviews}: ProductReviewProps) {
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
            <div className="flex-[1_1_400px] text-base [&_img]:multi-[inline;max-h-[250px]]">
              <HtmlReplaceImgproxy html={review.review} />
            </div>
          </div>
        ))
      ) : (
        <div className="pt-6 font-medium">No reviews yet for this product</div>
      )}
    </div>
  );
}
