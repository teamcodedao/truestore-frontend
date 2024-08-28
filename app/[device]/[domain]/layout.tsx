import {notFound} from 'next/navigation';

import {getPlatformConfig} from '@common/platform/ssr';

import Provider from './providers';

export async function generateMetadata({params}: GenerateMetadataProps) {
  return {
    title: {
      template: `${params.domain} | %s`,
    },
  };
}

export default async function PlatformLayout({children, params}: LayoutProps) {
  const domain = params.domain;
  console.log(params, params.domain);
  const platform = await getPlatformConfig(domain);
  if (!platform) {
    console.info(`Platform not found: ${domain}`);
    notFound();
  }

  return (
    <Provider
      domain={domain}
      address={platform.address}
      company={platform.company}
      email={platform.email}
      phone={platform.phone}
      imgproxy_url={platform.imgproxy_url}
      paypal_client_id={platform.paypal_client_id}
      pixel_ids={platform.pixel_ids}
      ga_ids={platform.ga_ids}
      theme={platform.theme}
      customScripts={platform.customScripts ?? []}
    >
      {children}
    </Provider>
  );
}
