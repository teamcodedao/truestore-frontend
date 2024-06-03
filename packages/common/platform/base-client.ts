import 'server-only';

import got from 'got';

export const baseClient = got.extend({
  headers: {
    Authorization: `Basic ${Buffer.from(
      process.env.NEXT_API_AUTH,
      'utf-8'
    ).toString('base64')}`,
  },
});
