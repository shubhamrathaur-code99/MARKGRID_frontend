import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";
import { ToasterProvider } from "../components/ToasterProvider";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MarkGrid – Sign up",
  description: "Create your MarkGrid account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} min-h-screen bg-[url('/whitebg.jpg')] dark:bg-[url('/blackbg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ToasterProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
