"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/Navbar";

const OTP_DURATION = 59;
const HARD_CODED_OTP = "123456";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("OTP has been sent successfully");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return;

    const id = window.setTimeout(() => {
      setSecondsLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearTimeout(id);
  }, [secondsLeft]);

  useEffect(() => {
    if (!showToast) return;
    const id = window.setTimeout(() => setShowToast(false), 2500);
    return () => window.clearTimeout(id);
  }, [showToast]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpSent) {
      if (!email) return;
      setError(null);
      setOtpSent(true);
      setSecondsLeft(OTP_DURATION);
      setToastMessage("OTP has been sent successfully");
      setShowToast(true);
      return;
    }

    if (otp === HARD_CODED_OTP) {
      setError(null);
      router.push("/");
    } else {
      setError("Invalid OTP");
    }
  };

  const handleResend = () => {
    if (!email) return;
    setSecondsLeft(OTP_DURATION);
    setToastMessage("OTP resent");
    setShowToast(true);
  };

  const formattedSeconds = secondsLeft !== null
    ? secondsLeft.toString().padStart(2, "0")
    : "00";

  const handleOtpChange = (value: string) => {
    const numeric = value.replace(/\D/g, "").slice(0, 6);
    setOtp(numeric);
  };

  return (
    <div>
      <Navbar />
      <main
        className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
        role="main"
      >
        {showToast && (
          <div className="pointer-events-none absolute top-4 left-1/2 z-20 w-full max-w-xs -translate-x-1/2 rounded-lg bg-neutral-900 px-4 py-2 text-sm text-neutral-50 shadow-lg dark:bg-neutral-100 dark:text-neutral-900">
            {toastMessage}
          </div>
        )}

        <section
          className="w-full max-w-[420px] rounded-xl border border-neutral-200 bg-white p-8 shadow-2xl shadow-black/10 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-2xl dark:shadow-black/60"
          aria-labelledby="forgot-heading"
        >
          <header className="mb-8 text-center">
            <h1
              id="forgot-heading"
              className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100"
            >
              Forgot your password?
            </h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Enter your email to receive a one-time password (OTP)
            </p>
          </header>

          <form
            className="flex w-full flex-col gap-5"
            onSubmit={handleSendOtp}
            noValidate
            aria-label="Forgot password form"
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-500 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-primary dark:focus:ring-primary/20"
                aria-required="true"
              />
            </div>

            {otpSent && (
              <div className="space-y-2">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-neutral-900 dark:text-neutral-100"
                >
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="6-digit code"
                  value={otp}
                  onChange={(e) => handleOtpChange(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-500 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-primary dark:focus:ring-primary/20"
                  aria-required="true"
                />
                <div className="text-right text-xs text-neutral-600 dark:text-neutral-400">
                  {secondsLeft !== null && secondsLeft > 0 ? (
                    <span>
                      Resend OTP in 00:{formattedSeconds}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded dark:focus:ring-offset-neutral-900"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            >
              Send OTP
            </button>

            <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
              Remembered your password?{" "}
              <Link
                href="/"
                className="font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded dark:focus:ring-offset-neutral-900"
              >
                Login
              </Link>
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}
