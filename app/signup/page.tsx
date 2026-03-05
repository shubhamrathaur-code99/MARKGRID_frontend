import { Navbar } from "../../components/Navbar";
import { SignupForm } from "../../components/SignupForm";

export default function SignupPage() {
  return (
    <div>
      <Navbar />
      <main
        className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
        role="main"
      >
        <section
          className="w-full max-w-[420px] rounded-xl border border-neutral-200 bg-white p-8 shadow-2xl shadow-black/10 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-2xl dark:shadow-black/60"
          aria-labelledby="signup-heading"
        >
          <header className="mb-8 text-center">
            <h1
              id="signup-heading"
              className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100"
            >
              Welcome to MarkGrid
            </h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Create your account to get started
            </p>
          </header>
          <SignupForm />
        </section>
      </main>
    </div>
  );
}
