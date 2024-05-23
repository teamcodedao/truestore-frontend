export default function ContactPage() {
  return (
    <article className='prose lg:prose-xl'>
      <h1>Contact Us</h1>
      <p>
        Email:{' '}
        <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
          help@shoptroveusa.com
        </a>
      </p>
      <address className='space-y-2 font-medium'>
        <h3 className='text-xl font-bold'>CuTeng Queue Pte. Ltd</h3>
        <div>Address: 244 Fast North Drive 1, #02-05, Singapore, 528559</div>
        <div>
          <span className='font-bold'>Hours:</span>
          <ul className='indent-10'>
            <li>
              Monday - Friday: <span className='font-bold'>9am - 0pm</span>
            </li>
            <li>
              Saturday - Sunday: <span className='font-bold'>10am - 6pm</span>
            </li>
          </ul>
        </div>
      </address>
    </article>
  );
}
