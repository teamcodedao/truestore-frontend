import {unstable_cache as cache} from 'next/cache';

import ky from 'ky';
import ms from 'ms';

import firebaseConfig from '@/config/firebase.json';

import type {PlatformConfig} from './typings';
import {normalizeUrl} from './utils';

export const getPlatformConfig = cache(
  async (domain: string) => {
    const response = await ky
      .get(
        new URL(
          `PXTRUE2/${normalizeUrl(domain)}/.json`,
          firebaseConfig.clientConfig.databaseURL,
        ),
        {
          cache: 'no-store',
        },
      )
      .json<PlatformConfig>();

    return response;
  },
  [],
  {
    revalidate: 86400,
    tags: ['platform-config', 'all'],
  },
);
