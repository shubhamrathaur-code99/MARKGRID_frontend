import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Navbar } from "../../components/Navbar";
import { LogoutButton } from "../../components/LogoutButton";

export default function DashboardPage() {
  const authCookie = cookies().get("markgrid_auth");

  if (!authCookie) {
    redirect("/");
  }

  const email = authCookie.value;

  return (
    <div>
      <Navbar />
      <main
        className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
        role="main"
      >
        <section className="w-full max-w-2xl rounded-xl border border-neutral-200 bg-white p-8 shadow-2xl shadow-black/10 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-2xl dark:shadow-black/60">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Signed in as <span className="font-medium">{email}</span>
            </p>
          </header>

          <div className="flex flex-col gap-4">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              This is a temporary demo dashboard protected by a simple
              hard-coded authentication check. Use the logout button below to
              clear your session cookie and return to the login page.
            </p>
            <div>
              <LogoutButton />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

