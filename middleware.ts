import {NextRequest, NextResponse, userAgent} from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  const hostname = req.headers.get('host');
  const {device} = userAgent(req);
  const url = req.nextUrl;

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`;

  const response = NextResponse.rewrite(
    new URL(`/${hostname}${path}`, req.url),
  );

  response.cookies.set('device', device.type || 'desktop');

  return response;
}
