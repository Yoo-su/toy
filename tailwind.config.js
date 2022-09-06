/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'gowun-batang':['Gowun Batang', 'serif'],
        'nanum-gothic':['Nanum Gothic Coding', 'monospace']
      },
    },
  },
  plugins: [],
}