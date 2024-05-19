'use client';

import {Price} from '@/components/common';
import type {ProductCartItem} from '@model/product';

interface CartItemProps {
  cart?: ProductCartItem;
}

export default function CartItem({cart}: CartItemProps) {
  if (!cart) return null;

  return (
    <div className='flex gap-x-2'>
      <div className='size-[100px] shrink-0'>
        <img
          src={cart.variantion.image}
          alt=''
          className='size-full object-contain'
        />
      </div>
      <div>
        <h4 className='line-clamp-2 font-bold'>{cart.product.name}</h4>
        <div className='flex flex-wrap gap-1.5 font-medium'>
          {cart.variantion.attributes.map((attr, index) => (
            <span
              key={index}
              className='line-clamp-1 rounded bg-gray-300 px-1 text-xs text-slate-500'
            >
              {attr}
            </span>
          ))}
        </div>
        <div className='flex justify-between'>
          <div>action</div>
          <div>
            <Price
              size='sm'
              price={cart.variantion.sale_price || cart.variantion.price}
              regular_price={cart.variantion.regular_price}
            />
          </div>
        </div>
      </div>
      <button
        aria-label='Remove'
        className='block shrink-0 bg-red-500 px-1.5 text-xl text-white transition hover:bg-red-500/80'
      >
        <span className='i-carbon-trash-can'></span>
      </button>
    </div>
  );
}
