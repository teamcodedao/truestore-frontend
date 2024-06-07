import Link from 'next/link';

export default function OrderLayout({
  children,
  params,
}: LayoutProps<{id: string}>) {
  return (
    <div>
      <h3 className="flex items-end gap-1.5 text-xl font-semibold">
        <Link
          href="/order-tracking"
          className="flex items-center rounded bg-slate-200 px-1.5 py-1 transition hover:bg-slate-300"
        >
          <span className="i-carbon-arrow-left text-lg"></span>
        </Link>
        <span className="translate-y-0.5">Tracking Order</span>
      </h3>
      <div className='mt-3 has-[+_[aria-label="404"]]:hidden'>
        <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          It&apos;s on the way!
        </p>
        <p className="mt-2 text-base text-gray-500">
          Your order #{params.id} has shipped and will be with you soon.
        </p>
      </div>
      {children}
    </div>
  );
}
