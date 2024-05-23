'use client';

import {startTransition, Suspense, useEffect, useState} from 'react';

import clsx from 'clsx';
import {Dialog, Heading, Modal, ModalOverlay} from 'react-aria-components';
import {ErrorBoundary} from 'react-error-boundary';

import {NoSSR} from '@common/no-ssr';

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
      className='fixed inset-0 z-[998] bg-black/20 backdrop-blur-sm data-[entering]:animate-overlay-in data-[exiting]:animate-overlay-out'
    >
      <Modal
        onOpenChange={setOpen}
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
          <Heading slot='title'></Heading>
          <ErrorBoundary
            {...(canvas?.fallback
              ? {
                  fallback: canvas.fallback,
                }
              : {
                  fallback: <div>Something went wrong</div>,
                })}
          >
            <Suspense fallback={canvas?.loading}>
              {canvas?.ssr === false ? (
                <NoSSR>{canvas?.content}</NoSSR>
              ) : (
                canvas?.content
              )}
            </Suspense>
          </ErrorBoundary>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export default function Offcanvaser() {
  return (
    <NoSSR>
      <OffcanvasProvider />
    </NoSSR>
  );
}
