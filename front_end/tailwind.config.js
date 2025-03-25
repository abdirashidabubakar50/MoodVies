/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"], // Set Montserrat as the main font
      },
      colors: {
        accent: '#cbff4d',
        primary: '#2E2F57',
        secondary: '#ffffff'
      }
    },
  },
  plugins: [],
}

