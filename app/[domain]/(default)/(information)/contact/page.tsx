import type {Metadata} from 'next';

import {getPlatformConfig} from '@common/platform/ssr';

export const metadata: Metadata = {
  title: 'Contact Us',
};

export default async function ContactPage({params}: PageProps) {
  const domain = params.domain;
  const platform = await getPlatformConfig(domain);

  return (
    <article className='prose lg:prose-lg'>
      <h2>Contact Us</h2>
      <p>
        Email: <a href={`mailto:${platform.email}`}>{platform.email}</a>
      </p>
      <address className='space-y-2 font-medium'>
        <h4>{platform.company}</h4>
        <div>{platform.address}</div>
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
