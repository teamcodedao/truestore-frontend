import {denyUrls, ignoreErrors} from 'sentry-ignores';

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  environment: process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_VERSION,
  ignoreErrors: [
    ...ignoreErrors,
    '/graphql',
    'zaloJSV2',
    'Load failed',
    'Failed to fetch',
    'Component closed',
    'AbortError: AbortError',
    'This operation was aborted',
    'Unhandled Unexpected token',
    'SecurityError',
    'Unknown root exit status',
    'Connection to Indexed Database server lost',
    'Database deleted by request of the user',
    'Failed to look up IDBObjectStoreInfo from identifier',
    "Cannot read properties of null (reading 'shadowRoot')",
    'Window closed for postrobot_method before ack',
  ],
  denyUrls: [...denyUrls],
  beforeSend(event) {
    const userAgent = event.request?.headers?.['User-Agent'].toLowerCase();

    if (
      userAgent &&
      [
        'bot',
        'crawl',
        'spider',
        'facebook',
        'bingpreview',
        'slurp',
        'yandex',
        'sogou',
        'tumblr',
        'ia_archiver',
      ].some(word => userAgent.includes(word))
    ) {
      return null;
    }

    return event;
  },
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.breadcrumbsIntegration({
      console: false,
      dom: false,
    }),
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
