import {use} from 'react';

import type {Except} from 'type-fest';

import {
  ProductReview as ImplProductReview,
  type ProductReviewProps,
} from '@/components/product';
import type {ProductReview} from '@model/product';

export default function SuspenseProductReview({
  promiseproductReview,
  ...restProps
}: Except<ProductReviewProps, 'reviews'> & {
  promiseproductReview: Promise<ProductReview[]>;
}) {
  const reviews = use(promiseproductReview);

  return <ImplProductReview {...restProps} reviews={reviews} />;
}
