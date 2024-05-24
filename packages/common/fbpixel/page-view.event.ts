import {getGenerelParameters} from './utils';

export function trackPageView(parameters?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.fbq) {
    return;
  }

  fbq('track', 'PageView', {
    ...parameters,
    ...getGenerelParameters(),
  });
}
