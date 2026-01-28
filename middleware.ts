import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/salary/:path*",
    "/california/salary/:path*",
  ],
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /salary/170000-after-tax-california  -> /california/170000-salary-after-tax
  let m = pathname.match(/^\/salary\/(\d+)-after-tax-california\/?$/);
  if (m) {
    const amount = m[1];
    const url = req.nextUrl.clone();
    url.pathname = `/california/${amount}-salary-after-tax`;
    return NextResponse.redirect(url, 308);
  }

  // /california/salary/170000-after-tax -> /california/170000-salary-after-tax
  m = pathname.match(/^\/california\/salary\/(\d+)-after-tax\/?$/);
  if (m) {
    const amount = m[1];
    const url = req.nextUrl.clone();
    url.pathname = `/california/${amount}-salary-after-tax`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}
