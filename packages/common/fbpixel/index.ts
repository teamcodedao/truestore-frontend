import dynamic from 'next/dynamic';

export const Fbpixel = dynamic(() => import('./fbpixel'), {
  ssr: false,
});
