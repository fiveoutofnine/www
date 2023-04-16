// prettier.config.js
module.exports = {
  bracketSpacing: true,
  semi: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  importOrder: [
    '(^(react/(.*)$)|^(react$))|(^(next/(.*)$)|^(next$))',
    '<THIRD_PARTY_MODULES>',
    '^@/styles/(.*)$',
    '^@/public/(.*)$',
    '^@/lib/(.*)$',
    '^@/components/(.*)$',
    '^@/pages/(.*)$',
  ],
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
  importOrderCaseInsensitive: true,
  plugins: ['@trivago/prettier-plugin-sort-imports', require('prettier-plugin-tailwindcss')],
};
