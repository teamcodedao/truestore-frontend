import {getUTM} from '@/lib/url';

import {type CreateOrder} from './typings';

export function createOrderMetadata() {
  const metadata: CreateOrder['meta_data'] = [];
  metadata.push({
    key: 'UA',
    value: navigator.userAgent,
  });
  metadata.push({
    key: 'QUERY',
    value: window.location.href.replace(/^https?:\/\//, ''),
  });
  let utm = '';
  utm = getUTM();
  if (utm != '') {
    metadata.push({
      key: 'FB_UTM',
      value: utm,
    });
  }
  return metadata;
}
