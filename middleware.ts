import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Enforce canonical host and redirect legacy URL patterns to the current canonicals.
// Goal: eliminate 404s/duplicates that trigger AdSense + indexing issues.

export const config = {
  // Run on all pages except static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

function isNumeric(x: string) {
  return /^[0-9]+$/.test(x);
}

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";
  const pathname = url.pathname;

  // 1) Force www canonical (reduces "duplicate without canonical" from www vs apex)
  // If you prefer apex, flip this logic.
  if (host && !host.startsWith("www.")) {
    url.hostname = "www." + host;
    return NextResponse.redirect(url, 301);
  }

  // 2) Legacy patterns → canonical salary pages
  // /california/salary/170000-after-tax  -> /salary/170000-after-tax-california
  const m1 = pathname.match(/^\/california\/salary\/([0-9]+)-after-tax\/?$/);
  if (m1 && isNumeric(m1[1])) {
    url.pathname = `/salary/${m1[1]}-after-tax-california`;
    return NextResponse.redirect(url, 301);
  }

  // /salary/170000-after-tax -> /salary/170000-after-tax-california
  const m2 = pathname.match(/^\/salary\/([0-9]+)-after-tax\/?$/);
  if (m2 && isNumeric(m2[1])) {
    url.pathname = `/salary/${m2[1]}-after-tax-california`;
    return NextResponse.redirect(url, 301);
  }

  // /how-much-is-170000-after-tax-in-california -> /salary/170000-after-tax-california
  const m3 = pathname.match(/^\/how-much-is-([0-9]+)-after-tax-in-california\/?$/);
  if (m3 && isNumeric(m3[1])) {
    url.pathname = `/salary/${m3[1]}-after-tax-california`;
    return NextResponse.redirect(url, 301);
  }

  // /california-paycheck-calculator -> /salary (common legacy)
  if (pathname === "/california-paycheck-calculator") {
    url.pathname = "/salary";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
