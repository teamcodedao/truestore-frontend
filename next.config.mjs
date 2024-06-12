import {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} from 'next/constants.js';

import path from 'node:path';

import {withSentryConfig} from '@sentry/nextjs';

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

export default async function config(phase) {
  const plugins = [];

  if ([PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER].includes(phase)) {
    plugins.push(nextConfig =>
      withSentryConfig(nextConfig, {
        telemetry: false,
        silent: false,
        hideSourceMaps: true,
        disableLogger: true,
        sourcemaps: {
          disable: false,
        },
        org: 'thesky9',
        project: 'truestore-frontend',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      }),
    );
  }

  return plugins.reduce((acc, plugin) => plugin(acc), nextConfig);
}
