import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "text-primary",
    "text-primary-hover",
    "bg-primary",
    "bg-primary-hover",
    "border-primary",
    "ring-primary",
    "focus:ring-primary",
    "focus:border-primary",
    "hover:text-primary-hover",
    "hover:bg-primary-hover",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#0070ff",
          hover: "#0060e0",
        },
      },
    },
  },
  plugins: [],
};
export default config;
