// middleware.ts
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse, userAgent } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "th"],
  defaultLocale: "th",
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  const res = I18nMiddleware(request);
  const locale = res.headers.get("x-next-locale");
  const newUrl = pathname.substring(3);
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/th', request.url));
  }
  console.log('rewrite', pathname, `/${locale}/${viewport}${newUrl}`);
  return NextResponse.rewrite(new URL(`/${locale}/${viewport}${newUrl}`, request.url));
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
