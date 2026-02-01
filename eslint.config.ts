import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ignores: ['generated/*'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': [2, 'always-multiline'],
      'react/react-in-jsx-scope': 'off',
      indent: 'off',
    },
  },
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    rules: {
      'no-undef': 'off',
    },
  },
  {
    files: ['**/types.{ts,tsx}'],
    rules: {
      'no-unused-vars': 'off',
    },
  },
  prettier,
]);

export default eslintConfig;
