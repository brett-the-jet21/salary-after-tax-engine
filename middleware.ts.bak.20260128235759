import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Old SEO route:
  // /salary/305000-after-tax-california -> /california/salary/305000-after-tax
  const m = pathname.match(/^\/salary\/(\d+)-after-tax-california\/?$/);
  if (m) {
    const amount = m[1];
    const url = req.nextUrl.clone();
    url.pathname = `/california/salary/${amount}-after-tax`;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/salary/:path*"] };
