import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        fedetur: {
          lime: "#AFED00",
          "lime-dark": "#8fc200",
          pink: "#FFA1CD",
          dark: "#002323",
          navy: "#0a3636",
          slate: "#171717",
          yellow: "#FFD602",
          cyan: "#17C4CF",
          cream: "#FFF8F0",
          sand: "#E9EFCB",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
