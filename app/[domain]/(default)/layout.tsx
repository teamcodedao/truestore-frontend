import Image from 'next/image';
import Link from 'next/link';

import {MenuOffcanvas} from '@/components/ui';
import logoImg from '@/images/logo.webp';

import Footer from './footer';

export const dynamic = 'error';

export default function DefaultLayout({children, params}: LayoutProps) {
  const domain = params.domain;

  return (
    <div className='flex min-h-screen flex-col'>
      <div className='container'>
        <header className='relative flex items-center justify-center gap-x-10 py-4'>
          <MenuOffcanvas className='absolute left-0' />
          <Link href='/'>
            <Image
              src={logoImg}
              quality={100}
              priority
              unoptimized
              height={65}
              alt=''
            />
          </Link>
        </header>
        <div className='mt-5'>{children}</div>
      </div>
      <div className='h-10 lg:h-16'></div>
      <Footer domain={domain} className='mt-auto' />
    </div>
  );
}
