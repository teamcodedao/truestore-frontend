import Image from 'next/image';
import Link from 'next/link';

import Footer from './footer';

import logoImg from '@/images/logo.webp';

export default function DefaultLayout({children}: LayoutProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='container'>
        <header className='flex items-center justify-center gap-x-10 py-4'>
          <button title='Menu' className='mr-auto'>
            <span className='i-radix-icons-hamburger-menu text-4xl'></span>
          </button>
          <Link href='/' className='mr-auto'>
            <Image src={logoImg} height={65} alt='' />
          </Link>
        </header>
        <div>{children}</div>
      </div>
      <Footer className='mt-auto' />
    </div>
  );
}
