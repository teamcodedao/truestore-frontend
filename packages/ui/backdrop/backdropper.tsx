'use client';

import {startTransition, useEffect, useState} from 'react';
import Image from 'next/image';

import {Modal, ModalOverlay} from 'react-aria-components';

import puffLoading from '@/images/puff.svg';
import {NoSSR} from '@common/no-ssr';

import {element, EVENT_NAME} from './constants';
import type {EventProps} from './typings';

function BackdropProvider() {
  const [backdrop, setBackdrop] = useState<EventProps | null>(null);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: CustomEvent<EventProps>) => {
      const props = e.detail;

      if (props.action === 'open') {
        setBackdrop(props);
        startTransition(() => {
          setOpen(true);
        });

        return;
      }

      if (props.action === 'close') {
        setOpen(false);
      }
    };

    element.addEventListener(EVENT_NAME, handler);

    return () => {
      element.removeEventListener(EVENT_NAME, handler);
    };
  }, []);

  return (
    <ModalOverlay
      isDismissable
      isOpen={isOpen}
      onOpenChange={setOpen}
      className="fixed inset-0 z-[999] bg-black/20 backdrop-blur-sm [animation-duration:150ms] data-[entering]:animate-overlay-in data-[exiting]:animate-overlay-out"
    >
      <Modal
        onOpenChange={setOpen}
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        {backdrop?.loading ?? (
          <div>
            <Image
              src={puffLoading}
              quality={100}
              priority
              height={100}
              alt=""
            />
          </div>
        )}
      </Modal>
    </ModalOverlay>
  );
}

export default function Backdropper() {
  return (
    <NoSSR>
      <BackdropProvider />
    </NoSSR>
  );
}
