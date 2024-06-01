import path from 'node:path';

import pkg from './package.json' assert {type: 'json'};

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  poweredByHeader: false,
  eslint: {
    dirs: ['app', 'components', 'lib', 'packages'],
  },
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
