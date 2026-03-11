import { redirect } from "next/navigation";
import Link from "next/link";
import { getAuthToken } from "@/lib/auth-server";
import { apiFetch } from "@/lib/api";

/**
 * Temporary test page to verify frontend can reach the Go backend.
 * GET /api/me — remove or restrict in production.
 */
export default async function ApiTestPage() {
  const token = await getAuthToken();
  if (!token) {
    redirect("/");
  }

  let meResult: unknown = null;
  let error: string | null = null;

  try {
    meResult = await apiFetch<unknown>("/api/me", { token });
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12 dark:bg-neutral-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Backend connection test
        </h1>
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
          GET {process.env.NEXT_PUBLIC_API_URL ?? "..."}/api/me
        </p>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
            <p className="font-medium text-red-800 dark:text-red-200">Error</p>
            <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
            <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
              Ensure the Go backend is running at the URL in .env.local.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
            <p className="font-medium text-neutral-900 dark:text-neutral-100">
              Response
            </p>
            <pre className="mt-2 overflow-x-auto rounded bg-neutral-100 p-3 text-sm text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
              {JSON.stringify(meResult, null, 2)}
            </pre>
          </div>
        )}

        <p className="mt-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-[#0070ff] hover:underline"
          >
            Back to Dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}
