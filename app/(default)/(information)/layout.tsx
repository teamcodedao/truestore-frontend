import {TrackPageView} from '@/components/common';

export default function InformationLayout({children}: LayoutProps) {
  return (
    <>
      {children}
      <TrackPageView />
    </>
  );
}
