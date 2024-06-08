import ky from 'ky';
import memoize, {memoizeClear} from 'memoize';
import ms from 'ms';

import {getPlatformConfig} from './get-platform-config';

async function getClient(domain: string) {
  const platform = await getPlatformConfig(domain);

  return ky.create({
    prefixUrl: platform.wp_api,
    headers: {
      Authorization: `Basic ${Buffer.from(platform.wp_auth, 'utf-8').toString(
        'base64',
      )}`,
    },
  });
}

export const createPlatformClient = memoize(getClient, {
  maxAge: ms('1 day'),
});

export function clearPlatformClient() {
  memoizeClear(createPlatformClient);
}
