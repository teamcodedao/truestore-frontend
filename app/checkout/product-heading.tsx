'use client';

import {useRouter} from 'next/navigation';

export default function ProductHeading() {
  const router = useRouter();

  return (
    <h3 className='flex items-center gap-1.5 text-xl font-semibold'>
      <button
        aria-label='Back'
        className='translate-y-0.5'
        onClick={() => {
          router.back();
        }}
      >
        <span className='i-carbon-arrow-left text-xl'></span>
      </button>
      <span>Order Summary</span>
    </h3>
  );
}
