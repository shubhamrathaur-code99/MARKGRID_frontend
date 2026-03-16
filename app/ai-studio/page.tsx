import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/auth-server";
import { apiFetch } from "@/lib/api";
import { AppLayout } from "@/components/layout/AppLayout";
import { AIStudioTopBar } from "@/components/topbar/AIStudioTopBar";
import { AIStudioContent } from "@/features/ai-studio/components/AIStudioContent";

export default async function AIStudioPage() {
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
      topBar={<AIStudioTopBar email={username} />}
    >
      <AIStudioContent />
    </AppLayout>
  );
}
