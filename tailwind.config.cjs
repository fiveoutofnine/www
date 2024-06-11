// eslint-disable-next-line @typescript-eslint/no-var-requires
const radixColors = require('@radix-ui/colors');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createPlugin } = require('windy-radix-palette');

// -----------------------------------------------------------------------------
// Radix colors
// -----------------------------------------------------------------------------

const colors = createPlugin({
  colors: {
    gray: radixColors.grayDark,
    red: radixColors.redDark,
    yellow: radixColors.yellowDark,
    green: radixColors.greenDark,
    blue: radixColors.blueDark,
    orange: radixColors.orangeDark,
  },
  opacitySupport: true,
});

// -----------------------------------------------------------------------------
// Tailwind configuration
// -----------------------------------------------------------------------------

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'bg-pulse': 'bg-pulse 2.5s cubic-bezier(.23,.68,.36,.96)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-fira-code)', ...fontFamily.mono],
      },
      gridTemplateRows: {
        1: 'repeat(1, minmax(0, 1fr))',
        2: 'repeat(2, minmax(0, 1fr))',
        3: 'repeat(3, minmax(0, 1fr))',
        4: 'repeat(4, minmax(0, 1fr))',
        5: 'repeat(5, minmax(0, 1fr))',
        6: 'repeat(6, minmax(0, 1fr))',
        7: 'repeat(7, minmax(0, 1fr))',
        9: 'repeat(9, minmax(0, 1fr))',
        10: 'repeat(10, minmax(0, 1fr))',
        11: 'repeat(11, minmax(0, 1fr))',
        12: 'repeat(12, minmax(0, 1fr))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'bg-pulse': {
          '0%': {
            // `blue-3`
            backgroundColor: '#0d2847',
            // `blue-6`
            outline: '1px solid #104d87',
          },
          '100%': {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            outline: '1px solid rgba(0, 0, 0, 0)',
          },
        },
      },
      zIndex: {
        base: '0',
        dropdown: '80',
        overlay: '90',
        popover: '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-percentage-width'),
    require('tailwindcss-animate'),
    colors.plugin,
  ],
  presets: [require('windy-radix-typography')],
};
