import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Payment Methods',
};

export default function PaymentMethodPage() {
  return (
    <article className='prose lg:prose-xl'>
      <h2>Payment Methods</h2>
      <p>
        Paying through credit card (VISA, Master) is available. Bringing to our
        customers the best convenience in payment is also one of our tasks. With
        PayPal, you will be easier to make a payment and finish your purchase as
        quickly as possible.
      </p>

      <h4>CONTACT US</h4>
      <p>
        Email:{' '}
        <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
          {process.env.NEXT_PUBLIC_EMAIL}
        </a>
      </p>
      <h4>CuTeng Queue Pte. Ltd</h4>
      <address>
        Address: 244 Fast North Drive 1, #02-05, Singapore, 528559
      </address>
    </article>
  );
}
