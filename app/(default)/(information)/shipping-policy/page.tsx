import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy',
};

export default function ShippingPolicyPage() {
  return (
    <article className='prose lg:prose-lg'>
      <h2>Shipping Policy</h2>
      <h4>When will I get the tracking number?</h4>
      <p>
        The in-store process for the stock and packaging will take about 2-5
        business days. Then, once your order is ready for the shipment, the
        tracking will be available and sent to you. Please allow extra time for
        your order to be processed during holidays and sale seasons.
      </p>
      <p>
        Please contact us if you do not receive tracking confirmation after 5
        working days from the day you completed your payment.
      </p>
      <p>
        If we are unable to process your order due to inaccurate or incomplete
        payment or incorrect address information, your order processing may be
        delayed.
      </p>
      <h4>When will I get my order ?</h4>
      <p>
        Your orders shall be shipped out from our warehouse located at:{' '}
        <strong>
          Area B, Hengjing Village, Zeguo Town, Wenling City, Taizhou City,
          Zhejiang Province, China.
        </strong>
      </p>
      <p>
        We proudly offer worldwide shipping via{' '}
        <strong>USPS, YDH, Yun Express,…</strong>
      </p>
      <p>
        Please kindly note your order will be processed for stocking, packing
        and shipping to your address that you provide to us. We shall commit
        about delivery time to you as table below:
      </p>
      <table className='min-w-full divide-y divide-gray-300'>
        <thead>
          <tr className='*:multi-[`px-3;py-3.5;text-left;font-semibold;text-gray-900`]'>
            <th scope='col' className='!pl-0'>
              Region
            </th>
            <th scope='col'>Commitment processing time</th>
            <th scope='col'>Commitment delivery time</th>
            <th scope='col'>Commitment timeframe</th>
          </tr>
        </thead>
        <tbody className='[&>tr:nth-child(even)]:bg-gray-50'>
          <tr>
            <td>North America region (excluded Mexico)</td>
            <td>3-5 days </td>
            <td>7-15 days </td>
            <td>10-20 days </td>
          </tr>
          <tr>
            <td>Europe & UK </td>
            <td>3-5 days </td>
            <td>5-7 days </td>
            <td>7-15 days </td>
          </tr>
          <tr>
            <td>Australia, New Zealand, Chile and other regions</td>
            <td>3-5 days </td>
            <td>10-20 days </td>
            <td>13-25 days </td>
          </tr>
        </tbody>
      </table>
      <p>
        Please kindly note that we shall not provide services to: South Asia
        (except India), Western Asia and Africa countries and other countries
        listed in Singapore Designated Individuals and Entities.
      </p>
      <h4>RISK FREE SHIPPING</h4>
      <p>
        If for whatever reason your goods don&apos;t arrive within{' '}
        <strong>6</strong>0 days, you will be refunded in FULL for that item.
        This is our promise to you! If there&apos;s a missing order, please let
        us know via
        <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
          {process.env.NEXT_PUBLIC_EMAIL}
        </a>
        . We&apos;ll investigate (it usually took <strong>3-5</strong> business
        days) and send you another one after we got a conclusion.
      </p>
      <h4>CUSTOMS AND TAXES</h4>
      <p>
        The prices displayed on our site are tax-free in US Dollars, which means
        you may be liable to pay for duties and taxes once you receive your
        order.
      </p>
      <p>
        Import taxes, duties and related customs fees may be charged once your
        order arrives at its final destination, which are determined by your
        local customs office. Payment of these charges and taxes are your
        responsibility and will not be covered by us. We are not responsible for
        delays caused by the customs department in your country. For further
        details of charges, please contact your local customs office.
      </p>
      <h4>WRONG ADDRESS DISCLAIMER</h4>
      <p>
        It is the responsibility of the buyer to make sure that she or he enters
        the address correctly. We cannot guarantee address changes due to strict
        shipping schedules. Please double-check the address you are entering, as
        we will NOT be held responsible for packages that are sent to the wrong
        address that the buyer has entered.
      </p>
      <p>If the order arrives at your country and:</p>
      <p>- The customer refuses to accept the package</p>
      <p>
        - Number of attempts is made in the country of destination to deliver
        the package.
      </p>
      <p>
        We reserve the right to abandon the package(s) and will not be
        responsible for any refund.
      </p>
      <p>
        If you have any questions or comments, please do not hesitate to contact
        us through:
      </p>
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
