import Image from 'next/image';

import type {Metadata} from 'next';

import logoImg from '@/images/logo.webp';

import CheckoutPayment from './payment';
import ProductHeading from './product-heading';
import ProductInformation from './product-information';

export const metadata: Metadata = {
  title: 'Checkout',
  robots: 'noindex',
};

export default function CheckoutPage() {
  return (
    <div className='flex min-h-screen w-full [--max-w:min(100%,550px)]'>
      <div className='flex flex-1 justify-end bg-gray-100 px-5 pb-12 pt-20 lg:px-10'>
        <div className='mt-10 max-w-[--max-w]'>
          <ProductHeading />
          <div className='h-4'></div>
          <ProductInformation />
        </div>
      </div>
      <div className='flex-1 px-5 pb-12 pt-5 lg:px-10'>
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
        <div className='mt-10 max-w-[--max-w]'>
          <CheckoutPayment />
        </div>
      </div>
    </div>
  );
}
