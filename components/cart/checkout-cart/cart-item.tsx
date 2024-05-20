'use client';

import {useState} from 'react';

import {Price} from '@/components/common';
import {updateCartQuantity} from '@model/cart';
import type {ProductCartItem} from '@model/product';
import {SpinNumber} from '@ui/spin-number';

interface CartItemProps {
  cart: ProductCartItem;
}

export default function CartItem({cart}: CartItemProps) {
  const [quantity, setQuantity] = useState(cart.quantity);

  async function handleChangeQuantity(quantity: number) {
    setQuantity(quantity);
    console.log('change', quantity);
  }

  return (
    <div className='flex gap-x-2'>
      <div className='size-[100px] shrink-0 bg-gray-100'>
        <img
          src={cart.variation.image}
          alt=''
          className='size-full object-contain'
        />
      </div>
      <div>
        <h4 className='line-clamp-2 font-bold'>{cart.product.name}</h4>
        <div className='flex flex-wrap gap-1.5 font-medium'>
          {cart.variation.attributes.map((attr, index) => (
            <span
              key={index}
              className='line-clamp-1 rounded bg-gray-300 px-1 text-xs text-slate-500'
            >
              {attr}
            </span>
          ))}
        </div>
        <div className='mt-2 flex flex-wrap justify-between'>
          <SpinNumber
            size='sm'
            value={quantity}
            min={1}
            onChange={handleChangeQuantity}
          />
          <Price
            size='md'
            price={String(
              quantity *
                Number(cart.variation.sale_price || cart.variation.price)
            )}
            regular_price={String(
              quantity * Number(cart.variation.regular_price)
            )}
          />
        </div>
      </div>
      <button
        aria-label='Remove'
        className='block shrink-0 bg-red-500 px-1.5 text-xl text-white transition hover:bg-red-400'
      >
        <span className='i-carbon-trash-can'></span>
      </button>
    </div>
  );
}
