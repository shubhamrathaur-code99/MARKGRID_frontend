/**
 * Central API client for the MarkGrid frontend.
 * All backend communication (http://localhost:8082) should go through this module.
 * Do not hardcode backend URLs in components.
 */

const getApiBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set. Add it to .env.local (e.g. http://localhost:8082)."
    );
  }
  return url.replace(/\/$/, "");
};

export type ApiFetchInit = RequestInit & {
  /** Auth token (e.g. from cookie). When provided, sets Authorization: Bearer <token>. */
  token?: string | null;
};

/**
 * Reusable API fetch helper. Uses NEXT_PUBLIC_API_URL as base.
 * - Attaches Authorization: Bearer <token> when token is provided.
 * - Returns parsed JSON on success.
 * - Throws on non-OK response.
 * - On 401, redirects to / (login) when running in the browser.
 */
export async function apiFetch<T = unknown>(
  path: string,
  init?: ApiFetchInit
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const { token, ...requestInit } = init ?? {};
  const url = path.startsWith("http") ? path : `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;

  const headers = new Headers(requestInit.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!headers.has("Content-Type") && requestInit.body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...requestInit,
    headers,
  });

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const text = await response.text();
    let message = text;
    try {
      const json = JSON.parse(text) as { error?: string; message?: string };
      message = json.error ?? json.message ?? text;
    } catch {
      // use text as-is
    }
    throw new Error(message || `Request failed: ${response.status}`);
  }

  const contentType = response.headers.get("Content-Type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }
  return response.text() as Promise<T>;
}
