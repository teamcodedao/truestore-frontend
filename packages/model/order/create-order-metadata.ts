import {getTrackingData} from '@tracking/data';

import type {CreateOrder, UpdateOrder, UpdateOrderMetadata} from './typings';

function getCommonMetadata() {
  const metadata: Array<{key: string; value: string}> = [];

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

    if (utm !== '') {
      metadata.push({
        key: 'FB_UTM',
        value: utm,
      });
    }
  }

  return metadata;
}

export function createOrderMetadata(): CreateOrder['meta_data'] {
  return getCommonMetadata();
}

export function updateOrderMetadata(
  params: UpdateOrderMetadata,
): UpdateOrder['meta_data'] {
  const metadata = getCommonMetadata();

  if (params.transaction_id) {
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
  }

  return metadata;
}
