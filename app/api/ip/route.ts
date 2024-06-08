import {NextResponse} from 'next/server';

export async function GET() {
  const response = await fetch('https://api.ipify.org/?format=json');
  const data = await response.json();
  return NextResponse.json({
    ip: data.ip,
  });
}
