import dayjs from 'dayjs';
import {
  child,
  type Database,
  type DatabaseReference,
  ref,
  set,
  update,
} from 'firebase/database';

import {fetchIp} from '@/lib/ip';
import type {CartItem} from '@model/cart';
import type {OrderTracking} from '@model/order';
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

  async trackingClickPaypal(
    productId: number,
    key: 'PAYPAL' | 'PAYPAL2' | 'PAYPAL3',
  ) {
    const ip = await fetchIp();
    if (!ip) {
      return;
    }
    const data = getGenerelParameters({
      userId: ip ?? '',
    });
    if (!data) {
      return;
    }
    const {timeTrack, userName} = data;
    set(
      child(
        this.dbRef,
        `${userName}/PUB/${timeTrack}/${productId}/${key}/${ip.replaceAll('.', 'DV')}`,
      ),
      dayjs().tz('America/Los_Angeles').format('DD-MM-YYYY HH:mm:ss'),
    );
  }

  async trackingPaypalError(productId: number, errorData: unknown) {
    const ip = await fetchIp();
    if (!ip) {
      return;
    }
    const data = getGenerelParameters({
      userId: ip ?? '',
    });
    if (!data) {
      return;
    }
    const {timeTrack, userName} = data;
    set(
      child(
        this.dbRef,
        `${userName}/PUB/${timeTrack}/${productId}/PAYPALERROR/${ip.replaceAll('.', 'DV')}`,
      ),
      errorData,
    );
  }

  async trackPurchase(order: OrderTracking, productIds: number[]) {
    const ip = await fetchIp();
    const data = getGenerelParameters({
      userId: ip ?? '',
    });
    if (!data) {
      return;
    }
    const {timeTrack, userName} = data;

    const updates: {[key: string]: any} = {};

    for (const productId of productIds) {
      updates[
        `${userName}/PUB/${timeTrack}/${productId}/ORDER/${order.transaction_id}`
      ] = order;
    }

    updates[`ORDER/${timeTrack}/${userName}/${order.transaction_id}`] = order;

    update(this.dbRef, updates);
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
      userAgent,
    } = data;

    const updates: {[key: string]: any} = {};

    for (const cart of carts) {
      const productId = cart.product.id;
      const productLink = cart.variation.link.replace(/\?.*$/, '');
      const productThumb = cart.variation.image;
      const productName = cart.product.name;

      updates[`${userName}/PUB/${timeTrack}/${productId}/VC/${userId}`] =
        `${timeTrack2} ${userAgent}`;
      updates[`${userName}/PUB/${timeTrack}/${productId}/CO/${userId}`] =
        `${timeTrack2} ${userAgent}`;
      updates[`${userName}/PUB/${timeTrack}/${productId}/NAME`] = productName;
      updates[`${userName}/PUB/${timeTrack}/${productId}/LK`] = productLink;
      updates[`${userName}/PUB/${timeTrack}/${productId}/TB`] = productThumb;

      if (isPub == 'PRI') {
        updates[
          `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/AD/${utmContent}/${utmTerm}/CR/VC/${userId}`
        ] = timeTrack2;
        updates[
          `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/AD/${utmContent}/${utmTerm}/CR/CO/${userId}`
        ] = timeTrack2;
        updates[
          `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/NAME`
        ] = productName;
        updates[
          `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/LK`
        ] = productLink;
        updates[
          `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/TB`
        ] = productThumb;
      }
    }

    update(this.dbRef, updates);
  }

  async trackingLogs(contentInfos: string[], product: Product) {
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
      userAgent,
    } = data;
    const productId = product.id;
    const productLink = product.permalink.replace(
      /^https?:\/\/admin\./,
      'https://',
    );
    const productThumb = product.images[0];
    const productName = product.name;

    const updates: {[key: string]: any} = {};

    contentInfos.forEach(contentInfo => {
      updates[
        `${userName}/PUB/${timeTrack}/${productId}/${contentInfo}/${userId}`
      ] = `${timeTrack2} ${userAgent}`;
    });

    if (this.trackThumb <= 0) {
      updates[`${userName}/PUB/${timeTrack}/${productId}/NAME`] = productName;
      updates[`${userName}/PUB/${timeTrack}/${productId}/LK`] = productLink;
      updates[`${userName}/PUB/${timeTrack}/${productId}/TB`] = productThumb;
    }

    if (isPub == 'PRI') {
      contentInfos.forEach(contentInfo => {
        updates[
          `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/AD/${utmContent}/${utmTerm}/CR/${contentInfo}/${userId}/${timeTrack2}`
        ] = productName;
      });

      if (this.trackThumb <= 0) {
        updates[
          `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/NAME`
        ] = productName;
        updates[
          `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/LK`
        ] = productLink;
        updates[
          `${userName}/${isPub}/${timeTrack}/${utmSource}/${utmMedium}/${utmCamp}/TB`
        ] = productThumb;
        this.trackThumb = 1;
      }
    }
    update(this.dbRef, updates);
  }
}
