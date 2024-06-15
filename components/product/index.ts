import lazy from 'next/dynamic';

export {default as ProductAttribute} from './product-attribute';
export {default as ProductCarousel} from './product-carousel';
export {
  default as ProductCartActions,
  ProductCartActionsSkeleton,
} from './product-cart-actions';
export {default as ProductCartMobileActions} from './product-cart-mobile-actions';
export {default as ProductCartMobileActionsV0} from './product-cart-mobile-actions-v0';
export {default as ProductFeature} from './product-feature';
export {default as ProductPrice} from './product-price';
export {
  default as ProductReview,
  type ProductReviewProps,
} from './product-review';

export const ProductTracking = lazy(() => import('./product-tracking'), {
  ssr: false,
});
