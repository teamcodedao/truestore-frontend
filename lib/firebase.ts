import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

import firebaseConfig from '@/config/firebase.json';

const firebaseApp = initializeApp({
  ...firebaseConfig.clientConfig,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
});

export const firebaseAuth = getAuth(firebaseApp);

export const database = getDatabase(firebaseApp);
