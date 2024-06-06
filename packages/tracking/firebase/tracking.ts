import {
  child,
  type Database,
  type DatabaseReference,
  ref,
  set,
} from 'firebase/database';

import {fetchIp} from '@/lib/ip';
import type {CartItem} from '@model/cart';
import type {Product} from '@model/product';

import {getGenerelParameters} from './utils';

export class Tracking {
  private dbRef: DatabaseReference;

  private trackThumb: number;

  constructor(db: Database) {
    this.dbRef = ref(db);
    this.trackThumb = 0;
  }

  trackingOrder(orderKey: string) {
    set(child(this.dbRef, `OR_LIST_ANALYTICS/${orderKey}`), 'OK');
  }

  async trackingCheckout({carts}: {carts: CartItem[]}) {
    const ip = await fetchIp();
    const data = getGenerelParameters({
      userId: ip ?? '',
    });

    if (!data) {
      return;
    }

    const {
      isPub,
      timeTrack,
      timeTrack2,
      userId,
      userName,
      utmCamp,
      utmContent,
      utmMedium,
      utmSource,
      utmTerm,
    } = data;

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
        child(this.dbRef, `${userName}/PUB/${timeTrack}/${productId}/TB`),
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

  async trackingLogs(contentInfo: string, product: Product) {
    const ip = await fetchIp();
    const data = getGenerelParameters({
      userId: ip ?? '',
    });

    if (!data) {
      return;
    }

    const {
      isPub,
      timeTrack,
      timeTrack2,
      userId,
      userName,
      utmCamp,
      utmContent,
      utmMedium,
      utmSource,
      utmTerm,
    } = data;
    const productId = product.id;
    const productLink = product.slug;
    const productThumb = product.images ? product.images[0]: "";
    const productName = product.name;
    set(
      child(
        this.dbRef,
        `${userName}/PUB/${timeTrack}/${productId}/${contentInfo}/${userId}`
      ),
      timeTrack2
    );


    if(this.trackThumb <= 0) {
      set(
        child(
          this.dbRef,
          `${userName}/PUB/${timeTrack}/${productId}/NAME`
        ),
        productName
      );
      set(
        child(
          this.dbRef,
          `${userName}/PUB/${timeTrack}/${productId}/LK`
        ),
        productLink
      );
      set(
        child(
          this.dbRef,
          `${userName}/PUB/${timeTrack}/${productId}/TB`
        ),
        productThumb
      );
    }

    if(isPub == "PRI") {
      set(
        child(
          this.dbRef,
          `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/AD/${utmContent}/${utmTerm}/CR/${contentInfo}/${userId}/${timeTrack2}`
        ),
        productName
      );

      if(this.trackThumb <= 0) {
        
        set(
          child(
            this.dbRef,
            `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/NAME`
          ),
          productName
        );
        set(
          child(
            this.dbRef,
            `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/LK`
          ),
          productLink
        );
        set(
          child(
            this.dbRef,
            `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/TB`
          ),
          productThumb
        );
        this.trackThumb = 1;
      }
    }

  }
}
