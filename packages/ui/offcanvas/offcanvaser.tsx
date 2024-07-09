'use client';

import {startTransition, Suspense, useEffect, useState} from 'react';

import {Dialog, Heading, Modal, ModalOverlay} from 'react-aria-components';
import {ErrorBoundary} from 'react-error-boundary';

import {cn} from '@/lib/cn';
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

  const content =
    canvas?.direction === 'bottom' ? (
      <div className="absolute inset-0 px-3 pb-2 pt-3">{canvas.content}</div>
    ) : (
      canvas?.content
    );

  return (
    <ModalOverlay
      isDismissable
      isOpen={isOpen}
      onOpenChange={setOpen}
      className="fixed inset-0 z-[998] bg-black/20 backdrop-blur-sm data-[entering]:animate-overlay-in data-[exiting]:animate-overlay-out"
    >
      <Modal
        onOpenChange={setOpen}
        className={cn(
          'fixed min-w-[300px] max-w-full bg-white shadow-lg',
          '[&_.react-aria-Dialog]:outline-none',
          {
            'left-0 data-[entering]:animate-slide-left-in data-[exiting]:animate-slide-left-out':
              canvas?.direction === 'left',
            'right-0 data-[entering]:animate-slide-right-in data-[exiting]:animate-slide-right-out':
              canvas?.direction === 'right',
            'bottom-0 w-full data-[entering]:animate-slide-bottom-in data-[exiting]:animate-slide-bottom-out [&_.react-aria-Dialog]:multi-[`size-full;overflow-hidden;relative`]':
              canvas?.direction === 'bottom',
            'inset-y-0': canvas?.direction !== 'bottom',
          },
        )}
        style={{
          ...(canvas?.direction === 'bottom'
            ? {
                height: canvas?.height || '75vh',
              }
            : {}),
        }}
      >
        <Dialog>
          <Heading slot="title"></Heading>
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
              {canvas?.ssr === false ? <NoSSR>{content}</NoSSR> : content}
            </Suspense>
          </ErrorBoundary>
          {canvas?.direction === 'bottom' && (
            <button
              className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-gray-100"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <span className="i-carbon-close text-base text-gray-600"></span>
            </button>
          )}
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
