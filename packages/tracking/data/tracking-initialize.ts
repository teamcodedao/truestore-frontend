import {setCookie} from 'react-use-cookie';

import {TRACKING_NAME} from './constants';
import {getTrackingData} from './get-tracking-data';
import type {TrackingData} from './typings';

function setCookieData() {
  setCookie(
    TRACKING_NAME,
    JSON.stringify({
      referrer: document.referrer,
      referrerUrl: window.location.href,
    } satisfies TrackingData),
    {
      path: '/',
      days: 1 / 24,
    }
  );
}

export function trackingInitialize() {
  if (typeof window === 'undefined') {
    console.info('Please call once trackingInitialize() inside of useEffect()');
    return;
  }

  const trackingData = getTrackingData();

  if (!trackingData) {
    setCookieData();
    return;
  }

  if (trackingData.referrer === '' && document.referrer !== '') {
    setCookieData();
  }
}
