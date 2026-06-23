import type { Config } from "tailwindcss";

const config: Config = {
  // Enable dark mode via a class on the root element
  darkMode: ["class"],

  // Scan all files that may contain Tailwind classes
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        // Tally-Inspired Trust Primaries
        brand: {
          navy: "#0A192F",     // Deep, trustworthy background & heavy text
          blue: "#1E3A8A",     // Primary UI interactive elements
          teal: "#0F766E",     // Success, "Filed & Secured" state indicator
        },
        // Odoo-Inspired Vibrant UI Accents
        accent: {
          gold: "#F59E0B",     // Odoo marker-yellow / alert highlighters
          mint: "#10B981",     // Soft, friendly interactive green
          rose: "#EF4444",     // High priority alert state
          purple: "#7C3AED",   // Playful primary/secondary accents
        },
        // Clean Neutrals with Purple/Slate Tints
        neutral: {
          canvas: "#F8FAFC",   // Standard page background
          surface: "#FFFFFF",  // Cards, drawers, modals
          muted: "#64748B",    // Secondary text and grid borders
        },
      },

      fontFamily: {
        // Structured sans-serif for numbers/grids + handwritten scripts for callouts
        sans: ["Inter", "system-ui", "sans-serif"],
        handwritten: ["Caveat", "Architects Daughter", "cursive"],
      },

      boxShadow: {
        // Tally-style flat "Sticker" drop shadows (Neo-brutalist Lite)
        "sticker-sm": "2px 2px 0px 0px #0A192F",
        "sticker": "4px 4px 0px 0px #0A192F",
        "sticker-lg": "6px 6px 0px 0px #0A192F",
        "sticker-hover": "2px 2px 0px 0px #0A192F",
      },

      borderRadius: {
        "sticker": "12px",    // Card elements
        "badge": "8px",       // Tag & icon containers
      },

      borderWidth: {
        "sticker": "2px",     // Bold outlines for the sticker look
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-to-right": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-from-bottom-2": {
          from: { transform: "translateY(8px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Drawer transitions (frontend.md §4 — sub-200ms)
        "slide-in-drawer": "slide-in-from-right 0.2s ease-out",
        "slide-out-drawer": "slide-out-to-right 0.15s ease-in",
        // Realtime comment bubbles
        "comment-in": "slide-in-from-bottom-2 0.15s ease-out",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
};

export default config;
