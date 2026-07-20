import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0B0A08",
        panel: "#15120D",
        panel2: "#1C1712",
        ember: "#FF6A2B",
        emberlight: "#FFA24D",
        signal: "#4DE6C8",
        paper: "#F5F1E8",
        muted: "#9C948A",
        line: "#2A241C",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "ember-glow":
          "radial-gradient(circle at 50% 50%, rgba(255,106,43,0.35) 0%, rgba(255,106,43,0) 70%)",
        grid: "linear-gradient(rgba(245,241,232,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,232,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        orbit: { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        "orbit-rev": { "0%": { transform: "rotate(360deg)" }, "100%": { transform: "rotate(0deg)" } },
        rise: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 22s linear infinite",
        orbit: "orbit 18s linear infinite",
        "orbit-rev": "orbit-rev 14s linear infinite",
        rise: "rise 0.7s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;