/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...require('tailwindcss/colors'),
      'cyan': '#4cbfa6',
      'light': '#f6ebf4',
      'purple': '#482673',
      'pink': '#ed0b70',
      'blue': '#023b59'
    },
  },
  plugins: [],
}
