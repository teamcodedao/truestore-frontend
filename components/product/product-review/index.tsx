import {use} from 'react';

import type {Except} from 'type-fest';

import type {ProductReview} from '@model/product';

import ImplProductReview, {type ProductReviewProps} from './product-review';

export default function SuspenseProductReview({
  promiseproductReview,
  ...restProps
}: Except<ProductReviewProps, 'reviews'> & {
  promiseproductReview: Promise<ProductReview[]>;
}) {
  const reviews = use(promiseproductReview);

  return <ImplProductReview {...restProps} reviews={reviews} />;
}
