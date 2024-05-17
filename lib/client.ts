import 'server-only';

import got from 'got';

export const client = got.extend({
  prefixUrl: process.env.NEXT_API,
  headers: {
    Authorization: `Basic ${Buffer.from(
      process.env.NEXT_API_AUTH,
      'utf-8'
    ).toString('base64')}`,
  },
});
