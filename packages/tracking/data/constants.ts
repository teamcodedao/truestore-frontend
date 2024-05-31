import * as v from 'valibot';

export const TRACKING_NAME = 'tracking-data';

export const TrackingDataSchema = v.object({
  referrer: v.string(),
  referrerUrl: v.pipe(v.string(), v.url()),
});
