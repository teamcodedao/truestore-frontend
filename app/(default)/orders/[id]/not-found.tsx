import Link from 'next/link';

export default function OrderNotFound() {
  return (
    <div aria-label='404' className='mt-5'>
      <h2>Could not find order</h2>
      <Link href='/order-tracking'>Return Tracking Order</Link>
    </div>
  );
}
