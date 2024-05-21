import {Suspense} from 'react';
import Image from 'next/image';

import type {Metadata} from 'next';

import {ButtonPaypal} from '@/components/common';
import logoImg from '@/images/logo.webp';
import {NoSSR} from '@ui/common';

export const metadata: Metadata = {
  title: 'Checkout',
  robots: 'noindex',
};

export default function CheckoutPage() {
  return (
    <div className='flex min-h-screen w-full'>
      <div className='flex flex-1 justify-end bg-gray-100 px-10 pb-12 pt-20'>
        <div className='mt-1'>
          <div>List product</div>
        </div>
      </div>
      <div className='flex-1 px-10 pb-12 pt-5'>
        <div>
          <a href='/'>
            <Image
              src={logoImg}
              quality={100}
              priority
              unoptimized
              height={65}
              alt=''
            />
          </a>
        </div>
        <div>
          <Suspense>
            <NoSSR>
              <ButtonPaypal />
            </NoSSR>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
