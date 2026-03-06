import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PremiumDashboardLayout } from "../../components/dashboard/PremiumDashboardLayout";

export default function DashboardPage() {
  const authCookie = cookies().get("markgrid_auth");

  if (!authCookie) {
    redirect("/");
  }

  const email = authCookie.value;

  return <PremiumDashboardLayout email={email} />;
}
