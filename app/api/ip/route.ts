import {headers} from 'next/headers';

export async function GET() {
  const ip = headers().get('x-forwarded-for');
  return Response.json({
    ip,
  });
}
