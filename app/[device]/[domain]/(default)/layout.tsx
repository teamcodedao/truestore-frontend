import Footer from './footer';
import Header from './header';

export default function DefaultLayout({children}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="hidden bg-black px-10 py-2 text-center text-base font-bold text-white forest:block">
        We SHIP WORLDWIDE for all weight.
      </div>
      <div className="container">
        <Header />
        <div>{children}</div>
      </div>
      <div className="h-10 lg:h-16"></div>
      <Footer className="mt-auto" />
    </div>
  );
}
