'use client';

import {useCart} from '@model/cart';

import CartItem from './cart-item';

export default function GroupCart() {
  const [{carts}, {setCartQuantity, deleteCart}] = useCart();

  return (
    <div className='mt-5 grow overflow-y-auto'>
      {carts.length ? (
        <div className='space-y-5'>
          {carts.map(cart => (
            <CartItem
              key={`${cart.product.id}-${cart.variation.id}`}
              cart={cart}
              onDelete={() => deleteCart(cart)}
              onQuantityChange={quantity => setCartQuantity(cart, quantity)}
            />
          ))}
        </div>
      ) : (
        <div>No products in the cart</div>
      )}
    </div>
  );
}
