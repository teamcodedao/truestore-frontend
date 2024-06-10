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
    hooks: {
      // Fallback to wc-api v1 and v2
      beforeRequest: [
        (request, options) => {
          if (/wp-json\/wc\/v[1|2]/.test(request.url)) {
            return ky(request.url.replace('wp-json/wc', 'wc-api'), {
              ...options,
              prefixUrl: undefined,
            });
          }
        },
      ],
    },
  });
}

export const createPlatformClient = memoize(getClient, {
  maxAge: ms('1 day'),
});

export function clearPlatformClient() {
  memoizeClear(createPlatformClient);
}
