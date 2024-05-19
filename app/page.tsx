import Link from 'next/link';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <h1 className='uppercase'>Try experimenting with different URLs</h1>
      <ul>
        <li>
          <Link href='/product/lacebra01'>
            https://truestore-frontend.vercel.app/product/lacebra01
          </Link>
        </li>
        <li>
          <Link href='/product/waistbra17'>
            https://truestore-frontend.vercel.app/product/waistbra17
          </Link>
        </li>
        <li>
          <Link href='/product/aipsneaker37'>
            https://truestore-frontend.vercel.app/product/aipsneaker37
          </Link>
        </li>
      </ul>
    </main>
  );
}
