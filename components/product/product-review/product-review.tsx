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
      className="space-y-10 divide-y [&>div:not(:first-child)]:pt-10"
    >
      {reviews.map((review, index) => (
        <div key={index} className="flex flex-wrap">
          <div className="flex-[0_0_300px] shrink-0">
            <p className="font-semibold">{review.reviewer_name}</p>
            <p className="-ml-px flex items-center gap-1 text-sm">
              <Image src={verifiedImg} alt="" />
              <span>Verified Buyer</span>
            </p>
          </div>
          <div className="flex-[1_1_500px] text-base [&_img]:multi-[inline;max-h-[250px]]">
            <HtmlReplaceImgproxy html={review.review} />
          </div>
        </div>
      ))}
    </div>
  );
}
