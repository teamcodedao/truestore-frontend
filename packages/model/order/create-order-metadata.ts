import {getTrackingData} from '@tracking/data';

import {type CreateOrder} from './typings';

export function createOrderMetadata() {
  const metadata: CreateOrder['meta_data'] = [];
  metadata.push({
    key: 'UA',
    value: navigator.userAgent,
  });
  metadata.push({
    key: 'QUERY',
    value: getTrackingData()?.referrerUrl.replace(/^https?:\/\//, '') || '',
  });
  const utm = getTrackingData()?.utm ?? '';
  if (utm != '') {
    metadata.push({
      key: 'FB_UTM',
      value: utm,
    });
  }
  return metadata;
}
