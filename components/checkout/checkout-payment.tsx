'use client';

import {Suspense} from 'react';
import Image from 'next/image';

import {ButtonPaypal} from '@/components/common';
import trustbadge from '@/images/trustbadge.png';

export default function CheckoutPayment() {
  return (
    <>
      <Suspense>
        <ButtonPaypal />
      </Suspense>
      <hr />
      <div className='mt-4 flex flex-col items-center gap-4 text-center'>
        <p className='font-medium'>
          All transactions are secure and encrypted by
        </p>
        <Image src={trustbadge} alt='' />
      </div>
    </>
  );
}
