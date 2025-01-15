import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserInSession } from "./lib/db/userCrud";

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

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    console.warn("No token found in cookies");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const userInSession = await getUserInSession();

  const role = userInSession?.role;
  const url = request.nextUrl;

  if (url.pathname === "/dashboard") {
    return NextResponse.next();
  }

  const routeAccess: Record<string, string[]> = {
    Admin: [
      "/dashboard/facilities",
      "/dashboard/users",
      "/dashboard/perks",
      "/dashboard/facilityPerks",
      "/dashboard/userFacilities",
    ],
    Owner: [
      "/dashboard/overview",
      "/dashboard/users",
      "/dashboard/bookings",
      "/dashboard/manage",
    ],
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
