import type { Config } from "tailwindcss";

/**
 * Dogpark designsystem v2, mappat till Tailwind.
 * Tre lager:
 *  1. primitives (sage-50, rose-500, etc) - direkta hex-värden
 *  2. semantic (action-primary, text-primary) - meningsbärande
 *  3. component (btn-primary-bg, card-bg) - specifik användning
 *
 * UI-kod ska helst använda semantic eller component, inte primitives.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Lager 1: Primitives
        sage: {
          50: "#F4F7F3",
          100: "#E5EBE2",
          200: "#C8D4C2",
          400: "#95A892",
          500: "#8FA689",
          600: "#6F8A6B",
          800: "#3F5A3D",
        },
        rose: {
          50: "#FBF1F3",
          100: "#F5DDE2",
          300: "#DBA1AB",
          500: "#C77B89",
          700: "#8E4D5A",
        },
        bone: {
          50: "#FDFCF9",
          100: "#F8F5EE",
          200: "#EFEAE0",
        },
        charcoal: {
          700: "#2D2A26",
          900: "#14110D",
          DEFAULT: "#1A1714",
        },

        // Lager 2: Semantic (referrar primitives)
        bg: {
          page: "#FDFCF9",
          surface: "#FFFFFF",
          "surface-raised": "#F8F5EE",
          inverse: "#14110D",
          "inverse-raised": "#2D2A26",
        },
        action: {
          primary: "#8FA689",
          "primary-hover": "#6F8A6B",
        },
        accent: {
          DEFAULT: "#C77B89",
          soft: "#F5DDE2",
          on: "#8E4D5A",
        },
        text: {
          primary: "#1A1714",
          secondary: "#2D2A26",
          muted: "#6B6862",
          "on-inverse": "#FDFCF9",
          "on-inverse-muted": "#B8AFA0",
        },
        status: {
          success: "#4F8A4A",
          warning: "#C97A2C",
          error: "#B33A3A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Iowan Old Style", "Georgia", "serif"],
        body: ["var(--font-body)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans: ["var(--font-body)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      borderRadius: {
        sm: "12px",
        md: "20px",
        lg: "28px",
        pill: "999px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
        progressFill: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        cursorBlink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
        breathe: "breathe 3.2s ease-in-out infinite",
        "progress-fill": "progressFill 1s cubic-bezier(0.22,1,0.36,1) 0.4s backwards",
        "cursor-blink": "cursorBlink 1s steps(2) infinite",
        "pulse-dot": "pulseDot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
