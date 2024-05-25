import {database} from '@/lib/firebase';

import {Tracking} from './tracking';

export const firebaseTracking = new Tracking(database);
