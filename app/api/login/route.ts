import { NextResponse } from "next/server";

const COOKIE_NAME = "auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    password?: string;
  } | null;

  const password = body?.password ?? "";
  const appPassword = process.env.APP_PASSWORD;

  if (!appPassword) {
    console.error("APP_PASSWORD is not set in .env");
    return NextResponse.json(
      { ok: false, error: "Server configuration error" },
      { status: 500 }
    );
  }

  if (password !== appPassword) {
    return NextResponse.json(
      { ok: false, error: "Wrong password" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });

  // postavi cookie koji vrijedi ~1 godinu
  res.cookies.set(COOKIE_NAME, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
    path: "/",
  });

  return res;
}
