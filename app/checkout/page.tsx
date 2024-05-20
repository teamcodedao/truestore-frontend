import Image from 'next/image';

import type {Metadata} from 'next';

import logoImg from '@/images/logo.webp';

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
        <div>TODO Payment</div>
      </div>
    </div>
  );
}
