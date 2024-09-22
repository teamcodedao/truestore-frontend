import ky from 'ky';
import memoize, {memoizeClear} from 'memoize';
import ms from 'ms';

import * as Sentry from '@sentry/nextjs';

import {getPlatformConfig} from './get-platform-config';

async function getClient(domain: string) {
  const platform = await getPlatformConfig(domain);

  const isV2 = platform.system === 'v2';
  const baseUrl = isV2
    ? `${process.env.PRODUCT_SERVICE}/api/public`
    : platform.wp_api;

  return ky.create({
    prefixUrl: baseUrl,
    headers: {
      ...(isV2
        ? {
            'x-domain':
              process.env.APP_ENV === 'local' ? '1siteclone.com' : domain,
          }
        : {
            Authorization: `Basic ${Buffer.from(
              platform.wp_auth,
              'utf-8',
            ).toString('base64')}`,
          }),
    },
    timeout: ms('30s'),
    retry: {
      limit: 3,
    },
    hooks: {
      beforeRetry: [
        ({request, retryCount}) => {
          console.info(`Retrying [${retryCount + 1}]: ${request.url}`);
        },
      ],
      beforeRequest: [
        request => {
          if (request.method === 'GET' && process.env.APP_ENV !== 'local') {
            let fullUrl = `${request.url}`;
            if (/wp-json\/wc\/v[1|2]/.test(fullUrl)) {
              fullUrl = fullUrl.replace('wp-json/wc', 'wc-api');
            }
            const proxyUrl = `http://207.246.121.223:3006/proxy?url=${encodeURIComponent(fullUrl)}`;
            const newRequest = new Request(proxyUrl, request);

            Object.assign(request, newRequest);
          }
        },
      ],
      beforeError: [
        async error => {
          console.log('error', error);
          if (error.response.status === 404) {
            return error;
          }

          Sentry.captureException(error);
          await Sentry.flush(2000);

          return error;
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
