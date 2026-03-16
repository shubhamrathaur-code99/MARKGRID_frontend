import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/auth-server";
import { apiFetch } from "@/lib/api";
import { AppLayout } from "@/components/layout/AppLayout";
import { ReportsTopBar } from "@/components/topbar/ReportsTopBar";

export default async function ReportsPage() {
  const token = await getAuthToken();
  if (!token) {
    redirect("/");
  }

  let username = "Account";
  try {
    const me = await apiFetch<{ username?: string }>("/api/me", { token });
    if (me && typeof me.username === "string" && me.username.trim() !== "") {
      username = me.username;
    }
  } catch {
    // keep fallback
  }

  return (
    <AppLayout
      email={username}
      topBar={<ReportsTopBar email={username} />}
    >
      <section className="mt-0">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Reports
        </h1>
        <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
          Select report type and date range, then export.
        </p>
        <div className="rounded-xl border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-800">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Use the top bar to choose report type, date range, and Export.
          </p>
        </div>
      </section>
    </AppLayout>
  );
}
