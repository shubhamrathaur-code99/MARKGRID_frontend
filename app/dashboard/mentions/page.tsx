import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/auth-server";
import { apiFetch } from "@/lib/api";
import { PremiumDashboardLayout } from "../../../components/dashboard/PremiumDashboardLayout";
import { DashboardTopBar } from "@/components/topbar/DashboardTopBar";
import { MentionsList } from "../../../components/dashboard/MentionsList";
import mentionsData from "../../../data/mentions/dummy_mentions_neosapien.json";

export default async function MentionsPage() {
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
    // keep fallback label
  }

  const mentions = mentionsData.mentions as Array<{
    platform: string;
    author: string;
    text: string;
    sentiment: "positive" | "neutral" | "negative";
    date: string;
    link: string;
  }>;

  return (
    <PremiumDashboardLayout
      email={username}
      topBar={<DashboardTopBar email={username} />}
    >
      <section className="mt-0">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Mentions
        </h1>
        <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
          Track where your brand is being discussed across platforms.
        </p>
        <MentionsList mentions={mentions} />
      </section>
    </PremiumDashboardLayout>
  );
}
