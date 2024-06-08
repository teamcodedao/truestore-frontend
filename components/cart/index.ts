import lazy from 'next/dynamic';

export {default as CheckoutCart} from './checkout-cart';
export {default as CheckoutCartError} from './checkout-cart-error';

export const YourCart = lazy(() => import('./your-cart'), {
  ssr: false,
});
