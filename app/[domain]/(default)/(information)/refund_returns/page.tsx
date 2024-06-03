import type {Metadata} from 'next';

import {Signature} from '@/components/common';

export const metadata: Metadata = {
  title: 'Return & Refund Policy',
};

export default function RefundReturnsPage({params}: PageProps) {
  const domain = params.domain;

  return (
    <article className='prose lg:prose-lg'>
      <h2>Return & Refund Policy</h2>
      <h4>PAYMENT</h4>
      <p>Paying through credit card (VISA, Master) is available.</p>
      <p>
        Bringing to our customers with the best convenience in payment is also
        one of our tasks. With PayPal, you will be easier to make a payment and
        finish your purchase as quickly as possible.
      </p>

      <h4>REFUND, RETURN & CANCEL</h4>
      <p>
        By placing an order, you have confirmed that you have read, understood
        and accepted these following policies.
      </p>
      <h4>Returns</h4>
      <p>
        We accept return on products which were shipped out by us and if the
        item is faulty due to an error on our end (e.g. wrong item or damaged
        item).
      </p>
      <p>Item(s) must be returned together with proof of purchase.</p>
      <p>
        To complete your return, we require a receipt or proof of purchase.
        Please contact our support team via contact@support-nkh.com for more
        information. Please be informed that you have to pay the return shipping
        fee.
      </p>
      <h4>Refunds</h4>
      <p>
        Our policy lasts 3 days from arrival date. If 3 days have gone by since
        you received the item, unfortunately, we can&apos;t offer you a refund
        or exchange.
      </p>
      <p>
        Once your return is received and inspected, we will send you an email to
        notify you that we have received your returned item.
      </p>
      <p>
        We will also notify you of the approval or rejection of your refund. If
        you are approved, then your refund will be processed, and a credit will
        automatically be applied to your credit card or original method of
        payment, within a certain amount of days.
      </p>
      <p>
        If you haven&apos;t received a refund yet, first check your bank account
        again
      </p>
      <p>
        Then contact your credit card company, it may take some time before your
        refund is officially posted.
      </p>
      <p>
        Next, contact your bank. There is often some processing time (5 business
        days) before a refund is posted.
      </p>
      <p>
        If you&pos;ve done all of this and you still have not received your
        refund yet, please contact us at contact@support-nkh.com
      </p>
      <h4>Cancel order</h4>
      <p>
        You can only cancel your order within 24 hours from purchasing time of
        the same day. Please be informed that a management, processing and
        transaction fee (1.5% of your total order value) will be applied for the
        cancellation. Full refund only applies to switching orders.
      </p>
      <p>
        Once you place new orders, our system will automatically cancel old
        orders and refund 100%.
      </p>

      <h4>CONTACT US</h4>
      <Signature domain={domain} />
    </article>
  );
}
