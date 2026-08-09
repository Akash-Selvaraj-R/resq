/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E11D48',
        background: '#0A0A0B',
        surface: '#111113',
        accent: '#FB7185',
      },
    },
  },
  plugins: [],
}
