import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SeoLayout } from "@/components/dashboard/SeoLayout";

export default function SeoPage() {
  const authCookie = cookies().get("markgrid_auth");

  if (!authCookie) {
    redirect("/");
  }

  return <SeoLayout email={authCookie.value} />;
}

