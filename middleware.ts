import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    console.warn("No token found in cookies");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const payload = parseJwt(token);

  if (!payload || payload.exp * 1000 < Date.now()) {
    console.warn("Token expired or invalid");
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("access_token");
    return response;
  }

  const role = payload?.role;
  const url = request.nextUrl;

  if (url.pathname === "/dashboard") {
    return NextResponse.next();
  }

  const routeAccess: Record<string, string[]> = {
    Admin: ["/dashboard"],
    Reception: [
      "/dashboard/rooms",
      "/dashboard/room-types",
      "/dashboard/bookings",
      "/dashboard/check-ins",
      "/dashboard/guests",
      "/dashboard/payments",
    ],
    HousekeepingAdmin: ["/dashboard/rooms", "/dashboard/housekeeping"],
    Housekeeping: ["/dashboard/housekeeping"],
  };

  const hasAccess = (role: string | undefined, pathname: string): boolean => {
    if (!role) return false;
    const accessibleRoutes = routeAccess[role];
    return accessibleRoutes?.some((route) => pathname.startsWith(route));
  };

  if (!hasAccess(role, url.pathname)) {
    console.warn(`Access denied for role: ${role} to ${url.pathname}`);
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
