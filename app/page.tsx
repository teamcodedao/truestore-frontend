import Image from 'next/image';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <h1 className='uppercase'>Try experimenting with different URLs</h1>
      <ul>
        <li>
          <a
            href='https://truestore-frontend.vercel.app/product/lacebra01'
            target='_blank'
          >
            https://truestore-frontend.vercel.app/product/lacebra01
          </a>
        </li>
        <li>
          <a
            href='https://truestore-frontend.vercel.app/product/waistbra17'
            target='_blank'
          >
            https://truestore-frontend.vercel.app/product/waistbra17
          </a>
        </li>
        <li>
          <a
            href='https://truestore-frontend.vercel.app/product/aipsneaker37'
            target='_blank'
          >
            https://truestore-frontend.vercel.app/product/aipsneaker37
          </a>
        </li>
      </ul>
    </main>
  );
}
