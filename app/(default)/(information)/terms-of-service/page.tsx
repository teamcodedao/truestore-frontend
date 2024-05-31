import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
};

export default function TermOfServicePage() {
  return (
    <article className='prose lg:prose-lg'>
      <h2>Terms of Service</h2>

      <p>
        Last updated on: <strong>06-Jun-23</strong>
      </p>

      <p>
        By accessing our website{' '}
        <strong>”{process.env.NEXT_PUBLIC_BASE}”</strong>, operated under{' '}
        <strong>CuTeng Queue Pte. Ltd</strong> and its affiliates, even you do
        not use our Goods, you are agreeing to be bound by the following terms
        and conditions (the “Terms”).
      </p>
      <p>
        As used in these terms: “we”, “us” and “localhost” means the applicable
        Website Party. These Terms apply to all users of the site, including
        without limitation users who are browsers, vendors, customers,
        merchants, and/ or contributors of content.
      </p>
      <p>
        Website reserves the right to update and change the Terms of Services by
        posting updates and changes to the Website. You are advised to check the
        Terms of Services from time to time for any updates or changes that may
        impact you, and if you do not accept such amendments, you must cease
        using the services. Your continued use of or access to the website
        following the posting of any changes constitutes acceptance of those
        changes.
      </p>
      <p>
        You must read, agree with and accept all of the terms and conditions
        contained or expressly referenced in these Terms of before you access
        Website and use any Goods.
      </p>

      <h4>SECTION 1 - ONLINE SITE TERMS</h4>
      <p>
        By agreeing to these terms of services, you represent that you are at
        least the age of majority in your state or province of residence, or
        that you are the age of majority in your state or province of residence
        and you have given us your consent to allow any of your minor dependents
        to use this site.
      </p>
      <p>
        You may not use our goods for any illegal or unauthorized purpose nor
        may you, in the use of the, violate any laws in your jurisdiction
        (including but not limited to copyright laws).
      </p>
      <p>
        You must not transmit any worms or viruses or any code of a destructive
        nature.
      </p>
      <p>
        Website does not discriminate on the basis of age, gender, race,
        ethnicity, nationality, religion, sexual orientation, or any other
        protected status.
      </p>

      <h4>SECTION 2 - GENERAL CONDITIONS</h4>
      <p>
        We reserve the right to refuse to anyone for any reason at any time.
      </p>
      <p>
        By using and/or the Website, you agree, without limitation or
        qualification, to be bound by, and to comply with, these Terms and
        conditions and any other posted guidelines or rules applicable to any
        website where the terms of services are found. We may make improvements
        and/or changes to the website at any time. Although we attempt to
        periodically update information on the website, the information,
        materials, and services provided on or through the Website may
        occasionally be inaccurate, incomplete, or out of date. We do not have a
        duty to update the information contained on the website, and we will not
        be liable for any failure to update such information.
      </p>
      <p>
        You understand that your content (not including credit card
        information), may be transferred unencrypted and involve (a)
        transmissions over various networks; and (b) changes to conform and
        adapt to the technical requirements of connecting networks or devices.
        Credit card information is always encrypted during transfer over
        networks.
      </p>
      <p>
        You agree not to reproduce, duplicate, copy, sell, resell or exploit any
        portion of, use of, or access to content or any contact on the website
        through which the is provided, without express wrote permission by us.
      </p>
      <p>
        The headings used in this agreement are included for convenience only
        and will not limit or otherwise affect these terms.
      </p>
      <p>Please direct any legal questions to:</p>
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

      <h4>SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h4>
      <p>
        We are not responsible if information made available on this site is not
        accurate, complete or current. The material on this site is provided for
        general information only and should not be relied upon or used as the
        sole basis for making decisions without consulting primary, more
        accurate, more complete, or more timely sources of information. Any
        reliance on the material on this site is at your own risk.
      </p>
      <p>
        This site may contain certain historical information. Historical
        information, necessarily, is not current and is provided for your
        reference only. We reserve the right to modify the contents of this site
        at any time, but we have no obligation to update any information on our
        site. You agree that it is your responsibility to monitor changes to our
        site.
      </p>

      <h4>SECTION 4 - MODIFICATIONS TO THE AND PRICES</h4>
      <p>Prices for our products are subject to change without notice.</p>
      <p>
        We reserve the right at any time to modify or discontinue the Service
        (or any part or content thereof) without notice at any time.
      </p>
      <p>
        We shall not be liable to you or to any third-party for any
        modification, price change, suspension or discontinuance of the Service.
      </p>

      <h4>SECTION 5 - GOODS</h4>
      <p>
        We reserve the right but are not obligated, to limit the sales of our
        goods or services to any person, geographic region or jurisdiction. We
        may exercise this right on a case-by-case basis. We reserve the right to
        limit the quantities of any goods or services that we offer. All
        descriptions of goods or product pricing are subject to change at any
        time without notice, at the sole discretion of us. We reserve the right
        to discontinue any product at any time. Any offer for any product or
        made on this site is void where prohibited.
      </p>
      <p>
        We do not warrant that the quality of any goods, information, or other
        material purchased or obtained by you will meet your expectations.
      </p>

      <h4>SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION</h4>
      <p>
        We reserve the right to refuse any order you place with us. We may, in
        our sole discretion, limit or cancel quantities purchased per person,
        per household or per order. These restrictions may include orders placed
        by or under the same customer account, the same credit card, and/or
        orders that use the same billing and/or shipping address. In the event
        that we make a change to or cancel an order, we may attempt to notify
        you by contacting the e-mail and/or billing address/phone number
        provided at the time the order was made. We reserve the right to limit
        or prohibit orders that, in our sole judgment, appear to be placed by
        dealers, resellers or distributors.
      </p>
      <p>
        You agree to provide current, complete and accurate purchase and account
        information for all purchases made at our store. You agree to promptly
        update your account and other information, including your email address,
        credit card numbers and expiration dates, so that we can complete your
        transactions and contact you as needed.
      </p>

      <h4>SECTION 7 - THIRD-PARTY LINKS</h4>
      <p>
        Certain content, products and services available via our goods may
        include materials from the third party.
      </p>
      <p>
        Third-party links on this site may direct you to the third party
        websites that are not affiliated with us. We are not responsible for
        examining or evaluating the content or accuracy and we do not warrant
        and will not have any liability or responsibility for any third party
        materials or websites, or for any other materials, products, or services
        of third party.
      </p>
      <p>
        We are not liable for any harm or damages related to the purchase or use
        of goods, services, resources, content, or any other transactions made
        in connection with any third-party websites. Please review carefully the
        third party&apos;s policies and practices and make sure you understand
        them before you engage in any transaction. Complaints, claims, concerns,
        or questions regarding third party products should be directed to the
        third party.
      </p>

      <h4>SECTION 8 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</h4>
      <p>
        If at our request, you send certain specific submissions (for example
        contest entries) or without a request from us you send creative ideas,
        suggestions, proposals, plans, or other materials, whether online, by
        email, by postal mail, or otherwise (collectively,
        &apos;comments&apos;), you agree that we may, at any time, without
        restriction, edit, copy, publish, distribute, translate and otherwise
        use in any medium any comments that you forward to us. We are and shall
        be under no obligation (1) to maintain any comments in confidence; (2)
        to pay compensation for any comments; or (3) to respond to any comments.
      </p>
      <p>
        We may, but have no obligation to, monitor, edit or remove content that
        we determine in our sole discretion are unlawful, offensive,
        threatening, libelous, defamatory, pornographic, obscene, or otherwise
        objectionable or violates any party&apos;s intellectual property or
        these terms of service.
      </p>
      <p>
        You agree that your comments will not violate any right of any third
        party, including copyright, trademark, privacy, personality or other
        personal or proprietary rights. You further agree that your comments
        will not contain libelous or otherwise unlawful, abusive or obscene
        material, or contain any computer virus or other malware that could in
        any way affect the operation of the Service or any related website. You
        may not use a false e-mail address, pretend to be someone other than
        yourself, or otherwise mislead us or third party as to the origin of any
        comments. You are solely responsible for any comments you make and their
        accuracy. We take no responsibility and assume no liability for any
        comments posted by you or any third party.
      </p>

      <h4>SECTION 9 - ACCESS TO CONTENT</h4>
      <p>
        Please be aware that the majority of the content found on or through the
        website is for general audiences, but there may be certain adult or
        mature content. Where there is mature or adult content, individuals who
        are less than 18 years of age or are not permitted to access such
        content under the laws of any applicable jurisdiction may not access
        such content. We have the right to refuse to sell goods to anyone under
        the age of 13. In case your provided information is not correct, you
        must solely be responsible for your own decision.
      </p>

      <h4>SECTION 10 - ERRORS, INACCURACIES AND OMISSIONS</h4>
      <p>
        Occasionally there may be information on our site or in the service that
        contains typographical errors, inaccuracies or omissions that may relate
        to product descriptions, pricing, promotions, offers, product shipping
        charges, transit times and availability. We reserve the right to correct
        any errors, inaccuracies or omissions, and to change or update
        information or cancel orders if any information in the website at any
        time without prior notice (including after you have submitted your
        order).
      </p>
      <p>
        We undertake no obligation to update, amend or clarify information in
        the website or on any related website, including without limitation,
        pricing information, except as required by law. No specified update or
        refresh date applied in the service or on any related website should be
        taken to indicate that all information in the website or on any related
        website has been modified or updated.
      </p>

      <h4>SECTION 11 - PROHIBITED USES</h4>
      <p>
        In addition to other prohibitions as set forth in the Terms of Service,
        you are prohibited from using the site or its content including but not
        limited to following points: (a) for any unlawful purpose; (b) to
        solicit others to perform or participate in any unlawful acts; (c) to
        violate any international, federal, provincial or state regulations,
        rules, laws, or local ordinances; (d) to infringe upon or violate our
        intellectual property rights or the intellectual property rights of
        others; (e) to harass, abuse, insult, harm, defame, slander, disparage,
        intimidate, or discriminate based on gender, sexual orientation,
        religion, ethnicity, race, age, national origin, or disability; (f) to
        submit false or misleading information; (g) to upload or transmit
        viruses or any other type of malicious code that will or may be used in
        any way that will affect the functionality or operation of the Website
        or related website, other websites, or the Internet; (h) to collect or
        track the personal information of others; (i) to spam, phish, pharm,
        pretext, spider, crawl, or scrape; (j) for any obscene or immoral
        purpose; or (k) to interfere with or circumvent the security features of
        the Service or any related website, other websites, or the Internet; (l)
        Fail to complete any transaction after submitting an order to purchase
        any goods or services, subject to any specific terms and conditions
        governing such transactions, or submit any order to purchase goods or
        services where you do not intend to complete the transaction. We reserve
        the right to terminate your use of the Service or any related website
        for violating any of the prohibited uses.
      </p>

      <h4>SECTION 12 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h4>
      <p>
        We do not guarantee, represent or warrant that your use of our service
        will be uninterrupted, timely, secure or error-free.
      </p>
      <p>
        We do not warrant that the results that may be obtained from the use of
        the service will be accurate or reliable.
      </p>
      <p>
        You expressly understand and agree that we disclaim any and all
        responsibility or liability for the accuracy, content, completeness,
        legality, reliability, or operability or availability of information or
        material in the services. We disclaim any responsibility for the
        deletion, failure to store, misdelivery, or untimely delivery of any
        information or material. We disclaim any responsibility or liability for
        any harm resulting from downloading or accessing any information or
        material through the services, including, without limitation, for harm
        caused by viruses or similar contamination or destructive features. We
        make no warranty regarding the reliability or accessibility of member
        web pages or any storage facilities offered by us.
      </p>
      <p>
        You understand and agree that any material downloaded or otherwise
        obtained through the use of the services is done at your own discretion
        and risk and that you will be solely responsible for any damages to your
        computer system or loss of data that results in the download of such
        material.
      </p>
      <p>
        You agree that from time to time we may remove the service for
        indefinite periods of time or cancel the service at any time, without
        notice to you.
      </p>
      <p>
        You expressly agree that your use of, or inability to use, the service
        is at your sole risk. The goods delivered to you through our services
        are (except as expressly stated by us) provided &apos;as is&apos; and
        &apos;as available for your use, without any representation, warranties
        or conditions of any kind, either express or implied, including all
        implied warranties or conditions of merchantability, merchantable
        quality, fitness for a particular purpose, durability, title, and
        non-infringement.
      </p>
      <p>
        In no case shall CuTeng Queue Pte. Ltd, our directors, officers,
        employees, affiliates, agents, contractors, interns, suppliers, service
        providers or licensors be liable for any injury, loss, claim, or any
        direct, indirect, incidental, punitive, special, or consequential
        damages of any kind, including, without limitation lost profits, lost
        revenue, lost savings, loss of data, replacement costs, or any similar
        damages, whether based in contract, tort (including negligence), strict
        liability or otherwise, arising from your use of any of goods,
        including, but not limited to, any errors or omissions in any content,
        or any loss or damage of any kind incurred as a result of the use of
        goods posted, transmitted, or otherwise made available via the service,
        even if advised of their possibility. Because some states or
        jurisdictions do not allow the exclusion or the limitation of liability
        for consequential or incidental damages, in such states or
        jurisdictions, our liability shall be limited to the maximum extent
        permitted by law.
      </p>

      <h4>SECTION 13 - INDEMNIFICATION</h4>
      <p>
        You agree to indemnify, defend and hold harmless CuTeng Queue Pte. Ltd
        and our parent, subsidiaries, affiliates, partners, officers, directors,
        agents, contractors, licensors, service providers, subcontractors,
        suppliers, interns and employees, harmless from any claim or demand,
        including reasonable attorneys&apos; fees, made by any third party due
        to or arising out of your breach of these terms of service or the
        documents they incorporate by reference or your violation of any law or
        the rights of a third-party.
      </p>

      <h4>SECTION 14 - SEVERABILITY</h4>
      <p>
        In the event that any provision of these terms of service is determined
        to be unlawful, void or unenforceable, such provision shall nonetheless
        be enforceable to the fullest extent permitted by applicable law, and
        the unenforceable portion shall be deemed to be severed from these terms
        of service, such determination shall not affect the validity and
        enforceability of any other remaining provisions.
      </p>

      <h4>SECTION 15 - GOVERNING LAW</h4>
      <p>
        These Terms of Service and any separate agreements whereby we provide
        you Services shall be governed by and construed in accordance with the
        laws of the United Kingdom.
      </p>

      <h4>SECTION 16 - CHANGES TO TERMS OF SERVICE</h4>
      <p>
        You can review the most current version of the terms of service at any
        time on this page.
      </p>
      <p>
        We reserve the right, at our sole discretion, to update, change or
        replace any part of these terms of service by posting updates and
        changes to our website. It is your responsibility to check our website
        periodically for changes. Your continued use of or access to our website
        or the service following the posting of any changes to these terms of
        service constitutes acceptance of those changes.
      </p>

      <h4>SECTION 17 - PERSONAL DATABASE MANAGEMENT</h4>
      <p>Please visit Privacy Policy to be updated our policy</p>
    </article>
  );
}
