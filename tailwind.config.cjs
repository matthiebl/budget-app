/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 500: '#4BBEDA', 900: '#2A83A1' },
        secondary: { 500: '#9B6FED', 900: '#974CEE' },
        alt: { 500: '#F58878', 900: '#C35F53' },
        alt2: { 500: '#F59161', 900: '#EA855F' },
        back: { 500: '#4B4D6A', 700: '#2F3049', 900: '#181B2B' },
      },
    },
  },
  plugins: [],
}
