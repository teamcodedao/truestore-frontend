import 'server-only';

import memoize, {memoizeClear} from 'memoize';

import {baseClient} from './base-client';
import {getPlatformConfig} from './get-platform-config';

async function getClient(domain: string) {
  const platform = await getPlatformConfig(domain);

  return baseClient.extend({
    https: {
      rejectUnauthorized: false
    },
    prefixUrl: platform.wp_api,
    headers: {
      Authorization: `Basic ${Buffer.from(platform.wp_auth, 'utf-8').toString(
        'base64'
      )}`,
    },
  });
}

export const createPlatformClient = memoize(getClient);

export function clearPlatformClient() {
  memoizeClear(createPlatformClient);
}
