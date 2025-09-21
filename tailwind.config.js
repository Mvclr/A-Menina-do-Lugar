/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'aml-primary': '#F6D003',
        'aml-secondary': '#4A784A',
        'aml-accent': '#77A35C',
        'aml-action': '#F60E26',
        'aml-dark': '#3A5940',
        'aml-light': '#FFFFFF',
        'aml-darker': '#172411',
      },
    },
  },
  plugins: [],
}