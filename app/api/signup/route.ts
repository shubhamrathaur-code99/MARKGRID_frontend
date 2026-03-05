import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { email, password } = await request.json().catch(() => ({}));

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  const cookieStore = cookies();

  cookieStore.set("markgrid_user_email", email, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("markgrid_user_password", password, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json({ success: true });
}

