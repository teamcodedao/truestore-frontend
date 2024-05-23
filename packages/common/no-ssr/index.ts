import dynamic from 'next/dynamic';

export const NoSSR = dynamic(() => import('./no-ssr'), {
  ssr: false,
});
