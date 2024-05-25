import dynamic from 'next/dynamic';

export {fbpixel} from './fb-pixel';

export const Fbpixel = dynamic(() => import('./fb-pixel'), {
  ssr: false,
});
