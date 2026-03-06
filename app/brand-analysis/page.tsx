import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BrandAnalysisLayout } from "@/components/dashboard/BrandAnalysisLayout";

export default async function BrandAnalysisPage() {
  const authCookie = (await cookies()).get("markgrid_auth");

  if (!authCookie) {
    redirect("/");
  }

  return <BrandAnalysisLayout email={authCookie.value} />;
}
