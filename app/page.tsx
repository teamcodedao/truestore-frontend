import Image from 'next/image';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <h1 className='uppercase'>Try experimenting with different URLs</h1>
      <ul>
        <li>
          <a
            href='https://truestore-frontend.vercel.app/product/23479'
            target='_blank'
          >
            https://truestore-frontend.vercel.app/product/23479
          </a>
        </li>
        <li>
          <a
            href='https://truestore-frontend.vercel.app/product/25143'
            target='_blank'
          >
            https://truestore-frontend.vercel.app/product/25143
          </a>
        </li>
        <li>
          <a
            href='https://truestore-frontend.vercel.app/product/13225'
            target='_blank'
          >
            https://truestore-frontend.vercel.app/product/13225
          </a>
        </li>
      </ul>
    </main>
  );
}
