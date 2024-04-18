import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        lg: "1024px",
        xl: "1200px",
        "2xl": "1536px",
      },
      colors: {
        black: "#101720",
      },
    },
  },
  plugins: [],
};
export default config;
