import {getPlatformConfig, PlatformProvider} from '@common/platform';

export default async function PlatformLayout({children, params}: LayoutProps) {
  const domain = params.domain;

  const platformConfig = await getPlatformConfig(domain);

  return (
    <PlatformProvider
      initialState={{
        domain,
        address: platformConfig.address,
        company: platformConfig.company,
        email: platformConfig.email,
        phone: platformConfig.phone,
      }}
    >
      {children}
    </PlatformProvider>
  );
}
