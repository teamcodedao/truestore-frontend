'use client';

import {useRouter} from 'next/navigation';

export default function CheckoutHeading() {
  const router = useRouter();

  return (
    <h3 className='flex items-end gap-1.5 text-xl font-semibold'>
      <button
        aria-label='Back'
        className='flex items-center rounded bg-slate-200 px-1.5 py-1 transition hover:bg-slate-300'
        onClick={() => {
          router.back();
        }}
      >
        <span className='i-carbon-arrow-left text-lg'></span>
      </button>
      <span className='translate-y-0.5'>Order Summary</span>
    </h3>
  );
}
