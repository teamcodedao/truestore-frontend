'use client';

import {useEffect, useRef} from 'react';
import {usePathname} from 'next/navigation';
import Script from 'next/script';

import ReactGA from 'react-ga4';
import {Toaster} from 'sonner';

import {cn} from '@/lib/cn';
import {
  PlatformProvider as BasePlatformProvider,
  type PublicPlatformConfig,
} from '@common/platform';
import {trackingInitialize} from '@tracking/data';
import {Fbpixel} from '@tracking/fbpixel';
import backdrop, {Backdropper} from '@ui/backdrop';
import offcanvas, {Offcanvaser} from '@ui/offcanvas';

interface PlatformProviderProps extends PublicPlatformConfig {}

interface CustomScriptProps {
  scriptKey: string;
  scriptContent: string;
}

const stripScriptTagsAndComments = (content: string): string => {
  let sanitizedContent = content.replace(/<\/?script[^>]*>/gi, '');
  sanitizedContent = sanitizedContent.replace(/<!--[\s\S]*?-->/g, '');
  return sanitizedContent;
};

const CustomScript: React.FC<CustomScriptProps> = ({
  scriptKey,
  scriptContent,
}) => {
  const scriptLoaded = useRef<boolean>(false);

  useEffect(() => {
    if (!scriptLoaded.current && scriptContent) {
      const sanitizedContent = stripScriptTagsAndComments(scriptContent);
      const script = document.createElement('script');
      script.innerHTML = sanitizedContent;
      document.head.appendChild(script);
      scriptLoaded.current = true;
    }
  }, [scriptKey, scriptContent]);

  return (
    <Script id={`custom-script-${scriptKey}`} strategy="afterInteractive">
      {stripScriptTagsAndComments(scriptContent)}
    </Script>
  );
};

export default function PlatformProvider({
  children,
  ...platformRest
}: React.PropsWithChildren<PlatformProviderProps>) {
  const pathname = usePathname();

  useEffect(() => {
    backdrop.close();
    offcanvas.close();
  }, [pathname]);

  useEffect(() => {
    trackingInitialize();
  }, []);

  useEffect(() => {
    if (platformRest.ga_ids && platformRest.ga_ids.length) {
      ReactGA.initialize(
        platformRest.ga_ids.map(trackingId => ({
          trackingId,
        })),
      );
    }
  }, [platformRest.ga_ids]);

  return (
    <BasePlatformProvider initialState={{...platformRest}}>
      {platformRest.customScripts &&
        Object.entries(platformRest.customScripts).map(([key, script]) => (
          <CustomScript key={key} scriptKey={key} scriptContent={script} />
        ))}
      <div className={cn(platformRest.theme, 'forest:bg-[#FDFBF4]')}>
        {children}
        <Offcanvaser className={platformRest.theme} />
        <Backdropper className={platformRest.theme} />
        <Toaster
          richColors
          position="top-center"
          className={platformRest.theme}
        />
      </div>
      <Fbpixel pixel_ids={platformRest.pixel_ids} />
    </BasePlatformProvider>
  );
}
