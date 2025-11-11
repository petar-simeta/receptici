// proxy.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const COOKIE_NAME = "auth";

// koje rute su javne (bez auth)
const PUBLIC_PATHS = ["/login", "/api/login", "/api/recipes"];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

// Glavna proxy funkcija (bivši middleware)
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // dopusti Next-ove statičke assete i favicon bez provjere
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // login i /api/login su uvijek dostupni
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const authCookie = req.cookies.get(COOKIE_NAME);

  if (!authCookie?.value) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// primijeni proxy na sve rute osim statike
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
