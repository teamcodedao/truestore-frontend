import dynamic from 'next/dynamic';

export {tiktokPixel} from './tiktok-pixel';

export const TiktokPixel = dynamic(() => import('./tiktok-pixel'), {
  ssr: false,
});
