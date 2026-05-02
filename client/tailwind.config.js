/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  "#fdfbf0",
          100: "#faf3d0",
          200: "#f5e49a",
          300: "#eecf5e",
          400: "#e6bb30",
          500: "#d4a017",
          600: "#b8830f",
          700: "#92630d",
          800: "#784f11",
          900: "#664213",
        },
        charcoal: {
          900: "#0f0e0b",
          800: "#1a1813",
          700: "#252218",
          600: "#332e20",
        },
        cream: {
          50:  "#fdfcf7",
          100: "#f8f4e8",
          200: "#f0e9cc",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body:    ["'Jost'", "sans-serif"],
        accent:  ["'Playfair Display'", "serif"],
      },
      animation: {
        "fade-up":    "fadeUp 0.8s ease-out forwards",
        "fade-in":    "fadeIn 1s ease-out forwards",
        shimmer:      "shimmer 2.5s infinite",
        float:        "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
