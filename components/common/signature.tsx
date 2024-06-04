'use client';

import {usePlatform} from '@common/platform';

export default function Signature() {
  const platform = usePlatform();

  return (
    <>
      <p>
        Email:{' '}
        <a
          href={`mailto:${`help@${platform.domain}`}`}
        >{`help@${platform.domain}`}</a>
      </p>
      <h4>{platform.company}</h4>
      <address>{platform.address}</address>
    </>
  );
}
