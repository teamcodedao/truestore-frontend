import {getTrackingData} from '@tracking/data';

import type {CreateOrder, UpdateOrder, UpdateOrderMetadata} from './typings';

export function createOrderMetadata() {
  const metadata: CreateOrder['meta_data'] = [];

  metadata.push({
    key: 'UA',
    value: navigator.userAgent,
  });

  const trackingData = getTrackingData();

  if (trackingData) {
    const {utm, referrerUrl} = trackingData;
    metadata.push({
      key: 'QUERY',
      value: referrerUrl.replace(/^https?:\/\//, '') || '',
    });

    if (utm != '') {
      metadata.push({
        key: 'FB_UTM',
        value: utm,
      });
    }
  }

  return metadata;
}

export function updateOrderMetadata(params: UpdateOrderMetadata) {
  const metadata: UpdateOrder['meta_data'] = [];

  if (!params.transaction_id) {
    return metadata;
  }

  metadata.push({
    key: '_ppcp_paypal_order_id',
    value: params.transaction_id,
  });

  metadata.push({
    key: '_ppcp_paypal_intent',
    value: 'CAPTURE',
  });

  metadata.push({
    key: '_ppcp_paypal_payment_mode',
    value: 'live',
  });

  return metadata;
}
