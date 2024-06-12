import {unstable_cache as cache} from 'next/cache';

import ky from 'ky';

import firebaseConfig from '@/config/firebase.json';

export const getPlatformPixel = cache(
  async () => {
    const response = await ky
      .get(
        new URL(`PXTRUE/ALL/.json`, firebaseConfig.clientConfig.databaseURL),
        {
          cache: 'no-store',
        },
      )
      .text();

    const pixelIds = response.split(/(?=DHV)/);

    return pixelIds;
  },
  [],
  {
    revalidate: 86400,
    tags: ['platform-pixel', 'all'],
  },
);
