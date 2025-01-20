import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req?.nextUrl?.searchParams.get("access_token");

  if (!accessToken) {
    return NextResponse.json(
      { message: "Access token is required" },
      { status: 400 }
    );
  }

  const res = NextResponse.redirect("http://localhost:3000/dashboard");

  res.cookies.set("access_token", accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return res;
}
