import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { username, password } = await request.json().catch(() => ({}));

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 },
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    return NextResponse.json(
      { error: "Backend URL is not configured" },
      { status: 500 },
    );
  }

  const loginUrl = `${baseUrl.replace(/\/$/, "")}/login`;

  let backendResponse: Response;
  try {
    backendResponse = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to reach authentication service" },
      { status: 502 },
    );
  }

  let payload: any = null;
  const text = await backendResponse.text();
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = null;
  }

  if (!backendResponse.ok) {
    const message =
      (payload && (payload.error || payload.message)) ||
      "Invalid username or password";
    return NextResponse.json(
      { error: message },
      { status: backendResponse.status || 401 },
    );
  }

  const token =
    (payload && (payload.token || payload.access_token)) ?? null;

  if (!token) {
    return NextResponse.json(
      { error: "Authentication token missing in response" },
      { status: 500 },
    );
  }

  cookies().set("markgrid_auth", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json({ success: true });
}

