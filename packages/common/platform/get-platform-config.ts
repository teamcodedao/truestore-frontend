import {unstable_cache as cache} from 'next/cache';

import ky from 'ky';
import type {Except} from 'type-fest';

import firebaseConfig from '@/config/firebase.json';

import {getPlatformPixel} from './get-platform-pixel';
import type {PlatformConfig} from './typings';
import {normalizeUrl} from './utils';

type PlatformConfigOutput = Except<PlatformConfig, 'pixel_ids' | 'ga_ids'> & {
  pixel_ids: string[];
  ga_ids: string[];
};

export const getPlatformConfig = cache(
  async (domain: string) => {
    if (domain.includes('localhost')) {
      return {
        domain,
        internalRedirect: true,
      } as unknown as PlatformConfigOutput;
    }

    const [platform, commonPixelIds] = await Promise.all([
      ky
        .get(
          new URL(
            `PXTRUE2/${normalizeUrl(domain)}/.json`,
            firebaseConfig.clientConfig.databaseURL,
          ),
          {
            cache: 'no-store',
          },
        )
        .json<PlatformConfig>(),
      getPlatformPixel(),
    ]);

    if (!platform) {
      return null!;
    }

    const pixelIds = [
      ...new Set([
        ...(platform.pixel_ids?.split('|') ?? []),
        ...commonPixelIds,
      ]),
    ].filter(Boolean);

    const gaIds = [
      ...new Set([
        ...(platform.ga_ids?.split('|') ?? []),
        `G-${process.env.NEXT_PUBLIC_GA_ID}`,
      ]),
    ].filter(Boolean);

    return {
      ...platform,
      ga_ids: gaIds,
      pixel_ids: pixelIds,
    } satisfies PlatformConfigOutput;
  },
  [],
  {
    revalidate: 86400,
    tags: ['platform-config', 'all'],
  },
);
