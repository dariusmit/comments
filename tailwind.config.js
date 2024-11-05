/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      desktop: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
};
