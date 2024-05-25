import {
  child,
  type Database,
  type DatabaseReference,
  ref,
  set,
} from 'firebase/database';

import type {CartItem} from '@model/cart';

export class Tracking {
  private dbRef: DatabaseReference;

  constructor(db: Database) {
    this.dbRef = ref(db);
  }

  trackingOrder(orderKey: string) {
    set(child(this.dbRef, `OR_LIST_ANALYTICS/${orderKey}`), 'OK');
  }

  trackingCheckout({
    userId,
    userName,
    carts,
    isPub,
    utmSource,
    utmMedium,
    utmCamp,
    utmContent,
    utmTerm,
    timeTrack,
    timeTrack2,
  }: {
    userId: string;
    userName: string;
    carts: CartItem[];
    isPub: string;
    utmSource: string;
    utmMedium: string;
    utmCamp: string;
    utmContent: string;
    utmTerm: string;
    timeTrack: string;
    timeTrack2: string;
  }) {
    for (const cart of carts) {
      const productId = cart.product.id;
      const productLink = cart.variation.link;
      const productThumb = cart.variation.image;
      const productName = cart.product.name;

      // 1
      set(
        child(
          this.dbRef,
          `${userName}/PUB/${timeTrack}/${productId}/VC/${userId}`
        ),
        timeTrack2
      );

      // 2
      set(
        child(
          this.dbRef,
          `${userName}/PUB/${timeTrack}/${productId}/CO/${userId}`
        ),
        timeTrack2
      );

      // 3
      set(
        child(this.dbRef, `${userName}/PUB/${timeTrack}/${productId}/NAME`),
        productName
      );

      // 4
      set(
        child(this.dbRef, `${userName}/PUB/${timeTrack}/${productId}/LK`),
        productLink
      );

      // 5
      set(
        child(this.dbRef, `${userName}/PUB/${timeTrack}/${productId}/LK`),
        productThumb
      );

      if (isPub == 'PRI') {
        // 6
        set(
          child(
            this.dbRef,
            `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/AD/${utmContent}/${utmTerm}/CR/VC/${userId}`
          ),
          timeTrack2
        );

        // 7
        set(
          child(
            this.dbRef,
            `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/AD/${utmContent}/${utmTerm}/CR/CO/${userId}`
          ),
          timeTrack2
        );

        // 8
        set(
          child(
            this.dbRef,
            `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/NAME`
          ),
          productName
        );

        // 9
        set(
          child(
            this.dbRef,
            `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/LK`
          ),
          productLink
        );

        // 10
        set(
          child(
            this.dbRef,
            `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/TB`
          ),
          productThumb
        );
      }
    }
  }
}
