import { NextResponse, NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') ?? '';
  const hostname = host.split(':')[0].toLowerCase();
  if (hostname.endsWith('.localhost')) {
    const subdomain = hostname.slice(0, -'.localhost'.length);
    if (!pathname.startsWith('/tenant')) return NextResponse.rewrite(new URL(`/tenant/${subdomain}${pathname}`, request.url));
  } else {
    const parts = hostname.split('.');
    if (parts.length > 2 && parts[0] !== 'www' && !pathname.startsWith('/tenant')) return NextResponse.rewrite(new URL(`/tenant/${parts[0]}`, request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'] };
