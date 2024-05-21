import dynamic from 'next/dynamic';
import Image from 'next/image';

import type {Metadata} from 'next';

import {
  CheckoutHeading,
  CheckoutInformationSkeleton,
  CheckoutPayment,
} from '@/components/checkout';
import {MenuOffcanvas} from '@/components/common';
import logoImg from '@/images/logo.webp';

const CheckoutInformation = dynamic(
  () => import('@/components/checkout').then(mod => mod.CheckoutInformation),
  {
    ssr: false,
    loading: () => (
      <div className='w-[550px]'>
        <CheckoutInformationSkeleton />
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: 'Checkout',
  robots: 'noindex',
};

export default function CheckoutPage() {
  return (
    <div className='flex min-h-screen w-full flex-col [--max-w:100%] sm:multi-[`[--max-w:min(100%,550px)];flex-row;`]'>
      <div className='flex grow justify-end overflow-hidden bg-gray-50 px-5 pb-10 sm:flex-1 lg:px-8'>
        <div className='max-w-[--max-w]'>
          <MenuOffcanvas className='mb-12 mt-5' />
          <CheckoutHeading />
          <div className='h-4'></div>
          <CheckoutInformation />
        </div>
      </div>

      <div className='grow px-5 pb-12 pt-5 sm:flex-1 lg:px-8'>
        <div className='-ml-3 hidden sm:block'>
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
        <div className='mt-10 max-w-[--max-w]'>
          <CheckoutPayment />
        </div>
      </div>
    </div>
  );
}
