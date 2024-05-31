import * as v from 'valibot';

import {TrackingDataSchema} from './constants';

export type TrackingData = v.InferOutput<typeof TrackingDataSchema>;
