import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/auth-server";
import { apiFetch } from "@/lib/api";
import { AppLayout } from "@/components/layout/AppLayout";
import { CompetitorsTopBar } from "@/components/topbar/CompetitorsTopBar";

export default async function CompetitorsPage() {
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
      topBar={<CompetitorsTopBar email={username} />}
    >
      <section className="mt-0">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Competitors
        </h1>
        <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
          Compare competitor domains and performance.
        </p>
        <div className="rounded-xl border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-800">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Enter a competitor domain and use the comparison selector and time range in the top bar.
          </p>
        </div>
      </section>
    </AppLayout>
  );
}
