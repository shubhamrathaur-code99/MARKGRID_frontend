/**
 * Server-only auth helpers. Use in Server Components or Route Handlers.
 * Do not import this file from Client Components.
 */
import { cookies } from "next/headers";

const AUTH_COOKIE_NAME = "markgrid_auth";

/**
 * Returns the auth token from the markgrid_auth cookie, or null if not set.
 * Use this when calling apiFetch() from a Server Component so the backend receives the token.
 */
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
  return value;
}
