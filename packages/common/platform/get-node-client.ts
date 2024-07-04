import ky from 'ky';
import memoize, {memoizeClear} from 'memoize';
import ms from 'ms';

import * as Sentry from '@sentry/nextjs';

const {NODE_API, NODE_AUTH} = process.env;

if (!NODE_API || !NODE_AUTH) {
  throw new Error('NODE_API environment variables must be set');
}

async function getNodeClient() {
  return ky.create({
    prefixUrl: NODE_API,
    timeout: ms('30s'),
    headers: {
      Authorization: `Basic ${Buffer.from(
        NODE_AUTH as string,
        'utf-8',
      ).toString('base64')}`,
    },
    retry: {
      limit: 3,
    },
    hooks: {
      beforeRetry: [
        ({request, retryCount}) => {
          console.info(`Retrying [${retryCount + 1}]: ${request.url}`);
        },
      ],
      beforeError: [
        async error => {
          console.info(error);
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

export const createNodeClient = memoize(getNodeClient, {
  maxAge: ms('1 day'),
});

export function clearNodeClient() {
  memoizeClear(createNodeClient);
}
