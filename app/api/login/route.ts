import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const DEMO_EMAIL = "demo@markgrid.com";
const DEMO_PASSWORD = "markgrid123";

export async function POST(request: Request) {
  const { email, password } = await request.json().catch(() => ({}));

  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    cookies().set("markgrid_auth", email, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "Invalid email or password" },
    { status: 401 },
  );
}

