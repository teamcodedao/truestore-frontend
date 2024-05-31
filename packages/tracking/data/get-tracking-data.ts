import {getCookie} from 'react-use-cookie';
import * as v from 'valibot';

import {TRACKING_NAME, TrackingDataSchema} from './constants';
import {getUTM} from './utils';

export function getTrackingData() {
  const trackingData = (raw => {
    try {
      const data = v.parse(TrackingDataSchema, JSON.parse(raw));
      const [utm] = getUTM(new URL(data.referrerUrl).search) ?? [''];
      return {
        ...data,
        utm,
      };
    } catch {
      return null;
    }
  })(getCookie(TRACKING_NAME));

  return trackingData;
}
