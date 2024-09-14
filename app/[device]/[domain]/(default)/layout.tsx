import {getPlatformConfig} from '@common/platform/ssr';

import ForestHeader from './_forest-header';
import Footer from './footer';
import Header from './header';

export default async function DefaultLayout({children, params}: LayoutProps) {
  const domain = params.domain;
  const platform = await getPlatformConfig(domain);
  const theme = platform?.theme || 'default';
  return (
    <div className="flex min-h-screen flex-col">
      <div className="hidden bg-black px-10 py-2 text-center text-base font-bold text-white forest:block">
        We SHIP WORLDWIDE for all weight.
      </div>
      {theme === 'forest' && <ForestHeader domain={domain} />}
      <div className="container">
        {theme !== 'forest' && <Header />}
        <div>{children}</div>
      </div>
      <div className="h-10 lg:h-16"></div>
      <Footer className="mt-auto" />
    </div>
  );
}
