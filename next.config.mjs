import {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} from 'next/constants.js';

import path from 'node:path';

import {withSentryConfig} from '@sentry/nextjs';

import pkg from './package.json' with {type: 'json'};

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  eslint: {
    dirs: ['app', 'components', 'lib', 'packages'],
  },
  cacheMaxMemorySize: 0,
  cacheHandler:
    process.env.NEXT_CACHE_HANDLER === '1'
      ? path.resolve('./cache-handler.mjs')
      : undefined,

  experimental: {
    missingSuspenseWithCSRBailout: false,
    serverComponentsExternalPackages: ['@sentry/nextjs'],
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

export default async function config(phase) {
  const plugins = [];

  // Kiểm tra xem Sentry có được enable không
  const isSentryEnabled = process.env.NEXT_PUBLIC_ENABLE_SENTRY === 'true';

  if ([PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER].includes(phase) && isSentryEnabled) {
    plugins.push(nextConfig =>
      withSentryConfig(nextConfig, {
        telemetry: false,
        silent: true,
        hideSourceMaps: true,
        disableLogger: true,
        release: process.env.NEXT_PUBLIC_VERSION,
        org: 'thesky9',
        project: 'truestore-frontend',
        authToken: process.env.SENTRY_AUTH_TOKEN,
        disableServerWebpackPlugin: true,
        disableClientWebpackPlugin: true,
      }),
    );
  }

  return plugins.reduce((acc, plugin) => plugin(acc), nextConfig);
}
