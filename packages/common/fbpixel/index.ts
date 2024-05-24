import dynamic from 'next/dynamic';

import {trackToCart} from './add-to-cart.event';
import {trackPageView} from './page-view.event';

export const Fbpixel = dynamic(() => import('./fbpixel'), {
  ssr: false,
});

export const fbpixel = {
  trackToCart,
  trackPageView,
};
