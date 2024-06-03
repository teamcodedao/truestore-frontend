import 'server-only';
import {unstable_cache as cache} from 'next/cache';

import got from 'got';

import firebaseConfig from '@/config/firebase.json';

import type {PlatformConfig} from './typings';
import {normalizeUrl} from './utils';

export const getPlatformConfig = cache(
  async (domain: string) => {
    const response = await got
      .get(
        new URL(
          `PXTRUE2/${normalizeUrl(domain)}/.json`,
          firebaseConfig.clientConfig.databaseURL
        )
      )
      .json<PlatformConfig>();

    return response;
  },
  [],
  {
    tags: ['platform-config'],
  }
);
