import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/auth-server";
import { apiFetch } from "@/lib/api";
import { BrandAnalysisLayout } from "@/components/dashboard/BrandAnalysisLayout";

export default async function BrandAnalysisPage() {
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
    // If /api/me fails, keep fallback label but do not expose token
  }

  return <BrandAnalysisLayout email={username} />;
}
