import 'server-only';

import ky from 'ky';
import ms from 'ms';

import firebaseConfig from '@/config/firebase.json';

import type {PlatformConfig} from './typings';
import {normalizeUrl} from './utils';

export async function getPlatformConfig(domain: string) {
  const response = await ky
    .get(
      new URL(
        `PXTRUE2/${normalizeUrl(domain)}/.json`,
        firebaseConfig.clientConfig.databaseURL,
      ),
      {
        next: {
          revalidate: ms('1 day') / 1000,
          tags: ['platform-config'],
        },
      },
    )
    .json<PlatformConfig>();

  return response;
}
