import dynamic from 'next/dynamic';

import {trackToCart} from './add-to-cart.event';

export const Fbpixel = dynamic(() => import('./fbpixel'), {
  ssr: false,
});

export const fbpixel = {
  trackToCart,
};
