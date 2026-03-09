import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PremiumDashboardLayout } from "../../../components/dashboard/PremiumDashboardLayout";
import { MentionsList } from "../../../components/dashboard/MentionsList";
import mentionsData from "../../../data/mentions/dummy_mentions_neosapien.json";

export default function MentionsPage() {
  const authCookie = cookies().get("markgrid_auth");

  if (!authCookie) {
    redirect("/");
  }

  const email = authCookie.value;
  const mentions = mentionsData.mentions as Array<{
    platform: string;
    author: string;
    text: string;
    sentiment: "positive" | "neutral" | "negative";
    date: string;
    link: string;
  }>;

  return (
    <PremiumDashboardLayout email={email}>
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
