import {getTrackingData} from '@tracking/data';

import type {CreateOrder, UpdateOrder, UpdateOrderMetadata} from './typings';

function getCommonMetadata(ip?: string) {
  const metadata: Array<{key: string; value: string}> = [];
  if (ip) {
    metadata.push({
      key: 'ip',
      value: ip,
    });
  }
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

export function createOrderMetadata(ip?: string): CreateOrder['meta_data'] {
  return getCommonMetadata(ip);
}

export function updateOrderMetadata(
  params: UpdateOrderMetadata,
): UpdateOrder['meta_data'] {
  const metadata = getCommonMetadata(params.ip);

  if (params.invoice_id) {
    metadata.push({
      key: 'invoice_id',
      value: params.invoice_id,
    });
  }
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
