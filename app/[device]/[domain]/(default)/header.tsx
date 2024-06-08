'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useSelectedLayoutSegment} from 'next/navigation';

import clsx from 'clsx';
import Sticky from 'react-stickynode';

import {YourCart} from '@/components/cart';
import {MatchDevice} from '@/components/common';
import {MenuOffcanvas} from '@/components/ui';
import logoImg from '@/images/logo.webp';
import {useDevice} from '@/lib/use-device';

export default function Header() {
  const device = useDevice();
  const layoutSegment = useSelectedLayoutSegment();

  return (
    <Sticky enabled={device === 'mobile'} innerZ={997}>
      <header
        className={clsx(
          'relative flex items-center justify-center gap-x-10 bg-white',
          {
            'py-4': device !== 'mobile',
          },
        )}
      >
        <MenuOffcanvas className="absolute left-0" />
        <Link href="/">
          <Image
            src={logoImg}
            quality={100}
            priority
            unoptimized
            height={65}
            alt=""
          />
        </Link>
        {layoutSegment === 'product' && (
          <MatchDevice devices={['mobile']}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <YourCart size="small" />
            </div>
          </MatchDevice>
        )}
      </header>
    </Sticky>
  );
}
