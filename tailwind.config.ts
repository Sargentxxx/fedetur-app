import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        fedetur: {
          // Google Stitch & Brand Oficial tokens
          primary: "#003561",
          marine: "#004C87",
          secondary: "#00658D",
          cyan: "#00A3E0",
          sky: "#38B6FF",
          "sky-light": "#E0F2FE",
          gold: "#F5A623",
          solar: "#FFD13B",
          amber: "#FFB955",
          "surface-canvas": "#FBF9F5",
          "surface-container": "#E7EEFF",
          "surface-high": "#DEE8FF",
          // Higgsfield AI Cinematic Dark tokens
          obsidian: "#060B13",
          void: "#0A1120",
          deep: "#0F172A",
          // Backward compatibility
          lime: "#AFED00",
          "lime-dark": "#8fc200",
          pink: "#FFA1CD",
          dark: "#003561",
          navy: "#004C87",
          slate: "#1E293B",
          yellow: "#FFD13B",
          cream: "#FBF9F5",
          sand: "#F0F4F8",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      maxWidth: {
        portal: "1440px",
      },
      boxShadow: {
        "higgsfield-glow": "0 0 35px -5px rgba(56, 182, 255, 0.25)",
        "gold-glow": "0 0 25px -4px rgba(245, 166, 35, 0.35)",
        "marine-depth": "0 20px 50px -10px rgba(0, 53, 97, 0.3)",
      },
      backgroundImage: {
        "radial-spotlight": "radial-gradient(circle at 50% 15%, rgba(56, 182, 255, 0.15), transparent 70%)",
        "radial-gold": "radial-gradient(circle at 50% 50%, rgba(245, 166, 35, 0.12), transparent 75%)",
      },
    },
  },
  plugins: [],
};

export default config;
