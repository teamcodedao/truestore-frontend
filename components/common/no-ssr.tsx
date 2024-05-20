'use client';

import {useIsSSR} from '@react-aria/ssr';

export default function NoSSR({children}: React.PropsWithChildren) {
  const isSSR = useIsSSR();
  return isSSR ? null : children;
}
