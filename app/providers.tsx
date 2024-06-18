'use client';

import './bootstrap';
import '@formatjs/intl-listformat/polyfill';
import '@formatjs/intl-listformat/locale-data/en';

export default function Providers({children}: React.PropsWithChildren) {
  return <>{children}</>;
}
