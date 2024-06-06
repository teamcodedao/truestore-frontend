import {getPlatformConfig} from '@common/platform';
import {Fbpixel} from '@tracking/fbpixel';

import Provider from './providers';

export default async function PlatformLayout({children, params}: LayoutProps) {
  const domain = params.domain;
  const platform = await getPlatformConfig(domain);

  const pixel_ids = platform.pixel_ids?.split('|') ?? [];
  const defaultGaId = 'G-W5GTKKM94P';
  const ga_ids = (platform.ga_ids?.split('|') ?? []).filter(Boolean);
  if (!ga_ids.includes(defaultGaId)) {
    ga_ids.push(defaultGaId);
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
      pixel_ids={pixel_ids}
      ga_ids={ga_ids}
    >
      {children}
      <Fbpixel pixel_ids={pixel_ids} />
    </Provider>
  );
}
