import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/auth-server";
import { apiFetch } from "@/lib/api";
import { AppLayout } from "@/components/layout/AppLayout";
import { SettingsTopBar } from "@/components/topbar/SettingsTopBar";

export default async function SettingsPage() {
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
      topBar={<SettingsTopBar email={username} />}
    >
      <section className="mt-0">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Settings
        </h1>
        <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
          Workspace settings, team members, and API keys.
        </p>
        <div className="rounded-xl border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-800">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Use the top bar to switch between Workspace, Team members, and API keys.
          </p>
        </div>
      </section>
    </AppLayout>
  );
}
