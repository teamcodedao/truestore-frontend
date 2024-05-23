import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'About Us',
};

export default function AboutPage() {
  return (
    <article className='prose lg:prose-xl'>
      <h1>About Us</h1>

      <div>
        Dear Valued Customers,
        <p>
          Welcome to <span className='font-bold'>shoptroveusa.com</span> that is
          operated under{' '}
          <span className='font-bold'>CuTeng Queue Pte. Ltd</span> - a company
          incorporated under <span className='font-bold'>Singapore</span> law
          located at: 244 Fast North Drive 1, #02-05, Singapore, 528559 and its
          affiliates provide access to the{' '}
          <span className='font-bold'>{'"'} shoptroveusa.com </span>
          {'"'} to your shopping experience.
        </p>
        <p>
          We’re dedicated to giving you the best and a variety of products with
          the highest quality of products, that are guaranteed to meet their
          needs and keep them satisfied! We have dedicated staff and strategic
          partners who help us research and create the products that bring the
          most value to our customers. We always keep an eye on the latest
          trends for such kinds of our products and continuously improve our
          products and out our customer’s wishes first.
        </p>
        <p>
          Our mission is to bring customers the best experience when using our
          products in both product quality and service quality.
        </p>
        <p>
          The interests of our customers are always the top priority for us, so
          we hope you will enjoy our products as much as we enjoy making them
          available to you.
        </p>
        <p>
          If you have any questions or comments, please do not hesitate to
          contact us through:
        </p>
        <p>
          Email:{' '}
          <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
            {process.env.NEXT_PUBLIC_EMAIL}
          </a>
        </p>
        <h2>CuTeng Queue Pte. Ltd</h2>
        <address>
          Address: 244 Fast North Drive 1, #02-05, Singapore, 528559
        </address>
        <p>Sincerely,</p>
      </div>
    </article>
  );
}
