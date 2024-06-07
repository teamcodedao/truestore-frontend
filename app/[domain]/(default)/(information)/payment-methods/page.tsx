import type {Metadata} from 'next';

import {Signature} from '@/components/common';

export const metadata: Metadata = {
  title: 'Payment Methods',
};

export default function PaymentMethodPage() {
  return (
    <article className="prose lg:prose-lg">
      <h2>Payment Methods</h2>
      <p>
        Paying through credit card (VISA, Master) is available. Bringing to our
        customers the best convenience in payment is also one of our tasks. With
        PayPal, you will be easier to make a payment and finish your purchase as
        quickly as possible.
      </p>

      <h4>CONTACT US</h4>
      <Signature />
    </article>
  );
}
