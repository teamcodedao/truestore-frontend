import {
  child,
  type Database,
  type DatabaseReference,
  ref,
  set,
} from 'firebase/database';

export class Tracking {
  private dbRef: DatabaseReference;

  constructor(db: Database) {
    this.dbRef = ref(db);
  }

  trackingOrder(orderKey: string) {
    set(child(this.dbRef, `OR_LIST_ANALYTICS/${orderKey}`), 'OK');
  }
}
