/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CC1119",   // red
        secondary: "#FF6168", // light red
        tertiary: "#FF3C48",  // dark red
        gray: "#F5F5F5", // light gray
      },
    },
  },
  plugins: [],
};
