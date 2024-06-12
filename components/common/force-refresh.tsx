'use client';

import {useDidMount} from 'rooks';

export default function ForceRefresh() {
  useDidMount(() => {
    window.location.reload();
  });

  return null;
}
