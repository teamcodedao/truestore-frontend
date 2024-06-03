import 'server-only';

import memoize, {memoizeClear} from 'memoize';

import {baseClient} from './base-client';
import {getPlatformConfig} from './get-platform-config';

async function getClient(domain: string) {
  const platform = await getPlatformConfig(domain);

  return baseClient.extend({
    prefixUrl: platform.wp_api,
  });
}

export const createPlatformClient = memoize(getClient);

export function clearPlatformClient() {
  memoizeClear(createPlatformClient);
}
