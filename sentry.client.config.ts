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
    'This operation was aborted',
    'Load failed',
    'Failed to fetch',
    'AbortError: AbortError',
    'SecurityError',
    'Unknown root exit status.',
    'Connection to Indexed Database server lost.',
  ],
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
  denyUrls: [...denyUrls],
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
