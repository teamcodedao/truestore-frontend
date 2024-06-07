import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div>
      <h2>Could not find product</h2>
      <Link href="/">Return Home</Link>
    </div>
  );
}
