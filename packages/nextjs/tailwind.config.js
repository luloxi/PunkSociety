/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"], // Dark mode setup
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: "#BFA88B", // Darkened creamy primary color
          "primary-content": "#403B32", // Darker contrast for text
          secondary: "#E2D4C2", // Darkened soft cream secondary
          "secondary-content": "#5A5147", // Darker tone for contrast
          accent: "#403B32", // Slightly darker cream for accent
          "accent-content": "#D8C3A6", // Dark brown for accent content
          neutral: "#E6DCC9", // Darkened neutral cream background
          "neutral-content": "#403B32", // Darker text color
          "base-100": "#D9CBB2", // Darker soft cream for base background
          "base-200": "#EDE3D3", // More visible cream for sections
          "base-300": "#CBBFA8", // A bit darker for borders/secondary base
          "base-content": "#5A5147", // Darker content color for base
          info: "#A2C0E5", // Slightly darker soft blue for info messages
          success: "#8BCC99", // Darkened pastel green for success
          warning: "#E8C28C", // Darkened creamy yellow for warnings
          error: "#E5A0A0", // Darkened pastel red for errors

          "--rounded-btn": "9999rem", // Keep the button rounded

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
