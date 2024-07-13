'use client';

import {useState} from 'react';

import {Price, SpinNumber} from '@/components/ui';
import {useImgproxy} from '@common/platform';
import type {CartItem} from '@model/cart';

interface CartItemProps {
  cart: CartItem;
  onQuantityChange: (quantity: number) => void;
  onDelete: () => void;
}

export default function CartItem({
  cart,
  onDelete,
  onQuantityChange,
}: CartItemProps) {
  const [quantity, setQuantity] = useState(cart.quantity);

  const imgproxy = useImgproxy();

  async function handleChangeQuantity(quantity: number) {
    setQuantity(quantity);
    onQuantityChange(quantity);
  }

  return (
    <div className="flex gap-x-2">
      <div className="size-[100px] shrink-0 bg-gray-100">
        <img
          src={imgproxy(cart.variation.image ?? '', ['rs:fit:200'])}
          alt=""
          className="size-full object-contain"
        />
      </div>
      <div>
        <h4 className="line-clamp-2 font-bold" title={cart.product.name}>
          {cart.product.name}
        </h4>
        <div className="flex flex-wrap gap-1.5 font-medium">
          {cart.variation.attributes.map((attr, index) => (
            <span
              key={index}
              className="line-clamp-1 rounded bg-gray-300 px-1 text-xs text-slate-500"
            >
              {attr.option}
            </span>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap justify-between">
          <SpinNumber
            size="sm"
            value={quantity}
            min={1}
            onChange={handleChangeQuantity}
          />
          <Price
            size="md"
            price={quantity * cart.variation.price}
            regular_price={quantity * cart.variation.regular_price}
          />
        </div>
      </div>
      <button
        aria-label="Remove"
        className="block shrink-0 bg-red-500 px-1.5 text-xl text-white transition hover:bg-red-400"
        onClick={onDelete}
      >
        <span className="i-carbon-trash-can"></span>
      </button>
    </div>
  );
}
