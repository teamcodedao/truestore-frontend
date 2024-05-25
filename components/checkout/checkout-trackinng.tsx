'use client';

import {useEffect} from 'react';
import {useSearchParams} from 'next/navigation';

import {useCart} from '@model/cart';
import {fbpixel} from '@tracking/fbpixel';
import {firebaseTracking} from '@tracking/firebase';

export default function CheckoutTracking() {
  const searchParams = useSearchParams();

  const [{carts, countTotal, subTotal}] = useCart();

  useEffect(() => {
    fbpixel.trackInitiateCheckout({
      content_category: 'Uncategorized',
      content_ids: carts.map(cart => String(cart.product.id)),
      content_name: carts.map(cart => cart.product.name).join(' - '),
      currency: 'USD',
      num_items: countTotal,
      value: subTotal,

      // Custom properties
      content_type: 'product',
      category_name: 'Uncategorized',
      subtotal: subTotal,
      contents: carts.map(cart => ({
        id: cart.variation.id,
        quantity: cart.quantity,
      })),
    });
  }, [carts, countTotal, subTotal]);

  useEffect(() => {
    fetch('/api/ip')
      .then(res => res.json())
      .then(res => {
        let userId = res.ip;
        let userName = window.location.host;

        const usTime = new Date().toLocaleString('en-US', {
          timeZone: 'America/Los_Angeles',
        });
        const timeIds = usTime.split(', ');
        let timeTrack = '';
        let timeTrack2 = '';

        if (timeIds.length > 0) timeTrack = timeIds[0];
        if (timeIds.length > 1) timeTrack2 = timeIds[1];

        if (timeTrack.length < 5) return;

        let isPub = 'PRI';
        const utmSource = searchParams.get('utm_source') || 'none';
        const utmMedium = searchParams.get('utm_medium') || 'none';
        const utmCamp = searchParams.get('utm_campaign') || 'none';
        const utmContent = searchParams.get('utm_content') || 'none';
        const utmTerm = searchParams.get('utm_term') || 'none';

        if (utmSource.length <= 0 || utmSource == 'none') {
          isPub = 'PUB';
        }

        timeTrack = timeTrack.replace(/\//g, '-');
        userName = userName.replace(/\./g, 'DV');
        userId = userId.replace(/\./g, 'DV');

        const navigator_info = window.navigator;
        const screen_info = window.screen;
        let uuid = String(navigator_info.mimeTypes.length);
        uuid += navigator_info.userAgent.replace(/\D+/g, '');
        uuid += navigator_info.plugins.length;
        uuid += screen_info.height || '';
        uuid += screen_info.width || '';
        uuid += screen_info.pixelDepth || '';
        userId += 'DV' + uuid;

        firebaseTracking.trackingCheckout({
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
        });
      });
  }, [carts, searchParams]);

  return null;
}
