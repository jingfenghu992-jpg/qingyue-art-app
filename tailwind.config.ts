import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        qing: {
          paper: "#F7F1E6",
          ink: "#355944",
          text: "#1F241F",
          muted: "#666B63",
          cinnabar: "#B85B46",
          card: "#FFFDF8",
        },
      },
      boxShadow: {
        "soft-ink": "0 18px 50px rgba(53, 89, 68, 0.14)",
        "seal": "0 10px 24px rgba(184, 91, 70, 0.22)",
      },
      fontFamily: {
        song: [
          "Noto Serif SC",
          "Songti SC",
          "STSong",
          "SimSun",
          "serif",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
