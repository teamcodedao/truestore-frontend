import path from 'node:path';

import pkg from './package.json' assert {type: 'json'};

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  eslint: {
    dirs: ['app', 'components', 'lib', 'packages'],
  },
  cacheHandler:
    process.env.NEXT_CACHE_HANDLER === '1'
      ? path.resolve('./cache-handler.mjs')
      : undefined,
  headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Version',
            value: process.env.NEXT_PUBLIC_VERSION || 'development',
          },
          {
            key: 'X-Author',
            value: pkg.author,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
