/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B04849",   // deep Cantonese red
        secondary: "#FAE55B", // egg-yolk yellow
        cream: "#FAEDD3",     // milk-tea beige
        concrete: "#B2B6B9",  // muted gray
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
