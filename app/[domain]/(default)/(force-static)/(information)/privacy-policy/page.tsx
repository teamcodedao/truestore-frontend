import type {Metadata} from 'next';

import {Signature} from '@/components/common';
import {getPlatformConfig} from '@common/platform';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default async function PrivacyPolicyPage({params}: PageProps) {
  const platform = await getPlatformConfig(params.domain);

  return (
    <article className='prose lg:prose-lg'>
      <h2>Privacy Policy</h2>

      <p>
        We know that you care how information about you is used and shared, and
        we appreciate your trust that we will do so carefully and sensibly. This
        Privacy Notice describes how <strong>{params.domain}</strong> and its
        affiliates (collectively
        <strong>“{platform.company}”</strong>collect and process your personal
        information through <strong>“{platform.company}”</strong>
        ebsites, devices, products, services that reference this Privacy Policy.
        By using <strong>{platform.company}</strong> Services, you are
        consenting to the practices described in this Privacy Privacy.
      </p>

      <ul>
        <li>
          What Personal Information About Customers Does{' '}
          <strong>{platform.company}</strong>
          Collect?
        </li>
        <li>
          For What Purposes Does <strong>{platform.company}</strong> Use Your
          Personal Information?
        </li>
        <li>What About Cookies and Other Identifiers?</li>
        <li>
          Does <strong>{platform.company}</strong> Share Your Personal
          Information?
        </li>
        <li>How Secure Is Information About Me?</li>
      </ul>

      <h4>
        What Personal Information About Customers Does {platform.company}
        Collect?
      </h4>
      <p>
        We collect your personal information in order to provide and continually
        improve our products and services.
      </p>
      <p>Here are the types of personal information we collect:</p>
      <p>
        Information You Give Us: We receive and store any information you
        provide when you access to our Website and take actions to sell our
        Goods through Website. You can choose not to provide certain
        information, but then you might not be able to take advantage of many of
        our <strong>{platform.company}</strong> Services.
      </p>
      <p>
        Automatic Information: We automatically collect and store certain types
        of information about your use of <strong>{platform.company}</strong>{' '}
        Services, including information about your interaction with content and
        services available through <strong>{platform.company}</strong> Services.
        Like many websites, we use &quot;cookies&quot; and other unique
        identifiers, and we obtain certain types of information when your web
        browser or device accesses
        <strong>{platform.company}</strong> Services and other content served by
        or on behalf of <strong>{platform.company}</strong> on other websites.
      </p>
      <p>
        Information from Other Sources: We might receive information about you
        from other sources, such as updated delivery and address information
        from our carriers, which we use to correct our records and deliver your
        next purchase more easily. Click here to see additional examples of the
        information we receive.
      </p>

      <h4>
        For What Purposes Does {platform.company} Use Your Personal Information?
      </h4>
      <p>
        We use your personal information to operate, provide, develop, and
        improve the products and services that we offer our customers. These
        purposes include:
      </p>
      <p>
        Purchase and delivery of products and services. We use your personal
        information to take and handle orders, deliver products and services,
        process payments, and communicate with you about orders, products and
        services, and promotional offers.
      </p>
      <p>
        Provide, troubleshoot, and improve <strong>{platform.company}</strong>{' '}
        Services. We use your personal information to provide functionality,
        analyze performance, fix errors, and improve the usability and
        effectiveness of the {platform.company}
        Services.
      </p>
      <p>
        Recommendations and personalization. We use your personal information to
        recommend features, products, and services that might be of interest to
        you, identify your preferences, and personalize your experience with
        {platform.company} Services.
      </p>
      <p>
        Comply with legal obligations. In certain cases, we collect and use your
        personal information to comply with laws. For instance, we collect from
        buyer’s information regarding place of establishment and bank account
        information for identity verification and other purposes.
      </p>
      <p>
        Communicate with you. We use your personal information to communicate
        with you in relation to {platform.company} Services via different
        channels (e.g., by phone, e-mail, chat).
      </p>
      <p>
        Advertising. We use your personal information to display interest-based
        ads for features, products, and services that might be of interest to
        you. We do not use information that personally identifies you to display
        interest-based ads. To learn more, please read our Interest-Based Ads
        notice.
      </p>
      <p>
        Fraud Prevention and Credit Risks. We use personal information to
        prevent and detect fraud and abuse in order to protect the security of
        our customers, <strong>{platform.company}</strong>, and others. We may
        also use scoring methods to assess and manage credit risks.
      </p>

      <h1>What About Cookies and Other Identifiers?</h1>
      <p>
        To enable our systems to recognize your browser or device and to provide
        and improve <strong>{platform.company}</strong> Services, we use cookies
        and other identifiers. For more information about cookies and how we use
        them, please read our Cookies Notice.
      </p>

      <h4>Does {platform.company} Share Your Personal Information?</h4>
      <p>
        Information about our customers is an important part of our business,
        and we are not in the business of selling our customers’ personal
        information to others. We share customers’ personal information only as
        described below and with subsidiaries{' '}
        <strong>{platform.company} PTE</strong>. LTD. controls that either are
        subject to this Privacy Privacy or follow practices at least as
        protective as those described in this Privacy Privacy.
      </p>
      <p>
        Third-Party Service Providers: We employ other companies and individuals
        to perform functions on our behalf. Examples include fulfilling orders
        for products or services, delivering packages, sending postal mail and
        e-mail, removing repetitive information from customer lists, analyzing
        data, providing marketing assistance, providing search results and links
        (including paid listings and links), processing payments, transmitting
        content, scoring, assessing and managing credit risk, and providing
        customer service. These third-party service providers have access to
        personal information needed to perform their functions, but may not use
        it for other purposes.
      </p>
      <p>
        Business Transfers: As we continue to develop our business, we might
        sell or buy other businesses or services. In such transactions, customer
        information generally is one of the transferred business assets but
        remains subject to the promises made in any pre-existing Privacy Policy
        (unless, of course, the customer consents otherwise). Also, in the
        unlikely event that <strong>{platform.company} PTE. LTD</strong>. or
        substantially all of its assets are acquired, customer information will
        of course be one of the transferred assets.
      </p>
      <p>
        Protection of <strong>{platform.company}</strong> and Others: We release
        account and other personal information when we believe release is
        appropriate to comply with the law; enforce or apply our Terms of
        Services and other agreements; or protect the rights, property, or
        safety of <strong>{platform.company}</strong>, our users, or others.
        This includes exchanging information with other companies and
        organizations for fraud protection and credit risk reduction.
      </p>
      <p>
        Other than as set out above, you will receive notice when personal
        information about you might be shared with third parties, and you will
        have an opportunity to choose not to share the information.
      </p>

      <h4>How Secure Is Information About Me?</h4>
      <p>We design our systems with your security and privacy in mind.</p>
      <p>
        We work to protect the security of your personal information during
        transmission by using encryption protocols and software.
      </p>
      <p>
        We follow the Payment Card Industry Data Security Standard (PCI DSS)
        when handling credit card data.
      </p>
      <p>
        We maintain physical, electronic, and procedural safeguards in
        connection with the collection, storage, and disclosure of personal
        customer information. Our security procedures mean that we may
        occasionally request proof of identity before we disclose personal
        information to you.
      </p>
      <p>
        Our devices offer security features to protect them against unauthorized
        access and loss of data. You can control these features and configure
        them based on your needs.
      </p>

      <h4>What Choices Do I Have?</h4>
      <p>
        If you have any questions as to how we collect and use your personal
        information, please contact us:
      </p>
      <Signature />
    </article>
  );
}
