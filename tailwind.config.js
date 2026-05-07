/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00ffe0",
        dark: "#050505"
      }
    }
  },
  plugins: []
}