import {notFound} from 'next/navigation';

import type {Metadata} from 'next';

import {getPlatformConfig} from '@common/platform/ssr';

import Provider from './providers';

type Params = {
  device: string;
  domain: string;
};

type LayoutProps = {
  children: React.ReactNode;
  params: Params;
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  return {
    title: `${params.domain} | %s`,
  };
}

export default async function PlatformLayout({children, params}: LayoutProps) {
  const domain = params.domain;
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
      <div className="forest:font-harmonia">{children}</div>
    </Provider>
  );
}
