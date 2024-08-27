import dynamic from 'next/dynamic';

export {snapPixel} from './snap-pixel';

export const SnapPixel = dynamic(() => import('./snap-pixel'), {
  ssr: false,
});
