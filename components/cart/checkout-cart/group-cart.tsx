'use client';

import type {CartItem as CartItemType} from '@model/cart';

import CartItem from './cart-item';

interface CartsProps {
  carts: CartItemType[];
}

export default function GroupCart({carts}: CartsProps) {
  return (
    <div className='mt-5 grow overflow-y-auto'>
      {carts.length ? (
        <div className='space-y-5'>
          {carts.map((cart, index) => (
            <CartItem key={index} cart={cart} />
          ))}
        </div>
      ) : (
        <div>No products in the cart</div>
      )}
    </div>
  );
}
