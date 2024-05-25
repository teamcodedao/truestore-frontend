import {headers} from 'next/headers';

export async function GET() {
  console.log('get ip');

  const ip = headers().get('x-forwarded-for');
  return Response.json({
    ip,
  });
}
