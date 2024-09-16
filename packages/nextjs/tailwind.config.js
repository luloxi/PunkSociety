/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: "#999999",
          "primary-content": "#000000",
          secondary: "#DAE8FF",
          "secondary-content": "#222222",
          accent: "#222222",
          "accent-content": "#222222",
          neutral: "#222222",
          "neutral-content": "#ffffff",
          "base-100": "#AAAAAA",
          "base-200": "#CCCCCC",
          "base-300": "#DAE8FF",
          "base-content": "#222222",
          info: "#93BBFB",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
      {
        dark: {
          primary: "#555555",
          "primary-content": "#F9FBFF",
          secondary: "#333333",
          "secondary-content": "#F9FBFF",
          accent: "#FFFFFF",
          "accent-content": "#F9FBFF",
          neutral: "#F9FBFF",
          "neutral-content": "#111111",
          "base-100": "#111111",
          "base-200": "#222222",
          "base-300": "#333333",
          "base-400": "#232323",
          "base-content": "#F9FBFF",
          info: "#111111",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "oklch(var(--p))",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
