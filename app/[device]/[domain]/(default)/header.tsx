'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useSelectedLayoutSegment} from 'next/navigation';

import Sticky from 'react-stickynode';

import {YourCart} from '@/components/cart';
import {MatchDevice} from '@/components/common';
import {MenuOffcanvas} from '@/components/ui';
import logoImg from '@/images/logo_home_page.png';
import {cn} from '@/lib/cn';
import {useDevice} from '@/lib/use-device';

export default function Header() {
  const device = useDevice();
  const layoutSegment = useSelectedLayoutSegment();

  return (
    <Sticky enabled={device === 'mobile'} innerZ={997}>
      <header
        className={cn(
          'relative flex items-center justify-center gap-x-10 bg-white py-3',
        )}
      >
        <MenuOffcanvas className="absolute left-0" />
        <Link href="/">
          <Image src={logoImg} quality={100} priority alt="" />
        </Link>
        {layoutSegment === 'product' && (
          <MatchDevice devices={['mobile']}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <YourCart size="sm" />
            </div>
          </MatchDevice>
        )}
      </header>
    </Sticky>
  );
}
