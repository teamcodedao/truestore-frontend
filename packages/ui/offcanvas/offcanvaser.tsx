'use client';

import {startTransition, useEffect, useState} from 'react';

import clsx from 'clsx';
import {Dialog, Heading, Modal, ModalOverlay} from 'react-aria-components';

import {useIsSSR} from '@react-aria/ssr';

import {element, EVENT_NAME} from './constants';
import type {EventProps} from './typings';

function OffcanvasProvider() {
  const [canvas, setCanvas] = useState<EventProps | null>(null);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: CustomEvent<EventProps>) => {
      const props = e.detail;

      if (props.action === 'open') {
        setCanvas(props);
        startTransition(() => {
          setOpen(true);
        });

        return;
      }

      if (props.action === 'close') {
        setOpen(false);
        startTransition(() => {
          setCanvas(null);
        });

        return;
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
      className='fixed inset-0 bg-black/20 backdrop-blur-sm data-[entering]:animate-overlay-in data-[exiting]:animate-overlay-out'
    >
      <Modal
        className={clsx(
          'fixed inset-y-0 min-w-[300px] max-w-full bg-white shadow-lg',
          {
            'left-0 data-[entering]:animate-slide-left-in data-[exiting]:animate-slide-left-out':
              canvas?.direction === 'left',
            'right-0 data-[entering]:animate-slide-right-in data-[exiting]:animate-slide-right-out':
              canvas?.direction === 'right',
          }
        )}
      >
        <Dialog>
          <Heading slot='title'>{canvas?.title}</Heading>
          {canvas?.content}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export default function Offcanvaser() {
  const isSSR = useIsSSR();
  return isSSR ? null : <OffcanvasProvider />;
}
