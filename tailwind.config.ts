// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#facc15",     // jaune principal
        secondary: "#fef08a",   // jaune pâle
        dark: "#1f2937",        // gris foncé
        light: "#f9fafb",       // gris clair
        accent: "#f59e0b",      // orange accent
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
