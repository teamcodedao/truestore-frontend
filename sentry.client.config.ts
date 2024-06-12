import {denyUrls, ignoreErrors} from 'sentry-ignores';

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  environment: process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_VERSION,
  ignoreErrors: [...ignoreErrors, 'aborted'],
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
