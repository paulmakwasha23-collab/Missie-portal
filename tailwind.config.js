/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#000080',
        navyDark: '#000050',
        brightRed: '#FF0000',
        gold: '#FFD700',
      }
    },
  },
  plugins: [],
}
