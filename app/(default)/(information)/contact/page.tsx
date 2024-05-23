import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
};

export default function ContactPage() {
  return (
    <article className='prose lg:prose-xl'>
      <h2>Contact Us</h2>
      <p>
        Email:{' '}
        <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
          help@shoptroveusa.com
        </a>
      </p>
      <address className='space-y-2 font-medium'>
        <h4>CuTeng Queue Pte. Ltd</h4>
        <div>Address: 244 Fast North Drive 1, #02-05, Singapore, 528559</div>
        <div>
          <strong>Hours:</strong>
          <ul className='indent-10'>
            <li>
              Monday - Friday: <strong>9am - 0pm</strong>
            </li>
            <li>
              Saturday - Sunday: <strong>10am - 6pm</strong>
            </li>
          </ul>
        </div>
      </address>
    </article>
  );
}
