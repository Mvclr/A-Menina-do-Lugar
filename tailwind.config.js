/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aml-primary': '#F6D003',
        'aml-secondary': '#077DDF',
        'aml-accent': '#009c3b',
        'aml-action': '#F60E26',
        'aml-dark': '#173885',
        'aml-light': '#FFFFFF',
      },
    },
  },
  plugins: [],
}