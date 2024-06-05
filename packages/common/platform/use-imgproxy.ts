'use client';

import {usePlatform} from './platform-context';
import {imgproxy} from './utils';

export function useImgproxy() {
  const platform = usePlatform();

  return (src: string, processing: string | string[] = '') => {
    return imgproxy(platform.imgproxy_url, src, processing);
  };
}
