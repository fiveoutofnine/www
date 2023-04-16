// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      zIndex: {
        base: '0',
        dropdown: '80',
        overlay: '90',
        popover: '100',
      },
      fontFamily: {
        sans: ['var(--inter-font)', ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-percentage-width'),
    require('tailwindcss-animate'),
    require('windy-radix-palette'),
  ],
};
