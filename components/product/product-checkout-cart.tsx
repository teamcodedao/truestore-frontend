'use client';

import clsx from 'clsx';

interface ProductCheckoutCartProps {
  onClose: () => void;
}

export default function ProductCheckoutCart({
  onClose,
}: ProductCheckoutCartProps) {
  return (
    <div className='flex h-screen w-[480px] flex-col px-10 py-8'>
      <header className='relative shrink-0 border-b pb-10'>
        <h3 className='text-2xl font-bold'>Your shopping cart</h3>
        <button
          aria-label='Close Checkout'
          onClick={onClose}
          className={clsx(
            'absolute right-0 top-0 flex size-10 items-center justify-center rounded-full bg-gray-200 text-white transition',
            'hover:bg-gray-300'
          )}
        >
          <span className='i-carbon-close text-3xl'></span>
        </button>
      </header>

      <div className='grow overflow-y-auto'>content</div>

      <footer className='mt-auto shrink-0 border-t pt-5'>
        <div className='flex justify-between'>
          <span className='text-lg font-bold'>Subtotal</span>:{' '}
          <span className='font-medium'>$114.98</span>
        </div>
        <button className='mt-5 w-full rounded-full bg-black px-5 py-4 text-xl font-bold text-white transition'>
          Proceed to Checkout
        </button>
      </footer>
    </div>
  );
}