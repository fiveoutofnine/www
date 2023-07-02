import type { PrismTheme } from 'prism-react-renderer';

export const theme: PrismTheme = {
  plain: {},
  styles: [
    {
      types: ['doctype doctype-tag'],
      style: { color: '#569cd6' },
    },
    {
      types: ['doctype name'],
      style: { color: '#9cdcfe' },
    },
    {
      types: ['comment', 'prolog'],
      style: { color: '#6a9955' },
    },
    {
      types: ['punctuation'],
      languages: ['html', 'css', 'javascript'],
      style: { color: '#d4d4d4' },
    },
    {
      types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol', 'inserted', 'unit'],
      style: { color: '#b5cea8' },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'deleted'],
      style: { color: '#ce9178' },
    },
    {
      types: ['string.url'],
      languages: ['css'],
      style: { textDecorationLine: 'underline' },
    },
    {
      types: ['operator', 'entity'],
      style: { color: '#d4d4d4' },
    },
    {
      types: ['operator.arrow'],
      style: { color: '#569cd6' },
    },
    {
      types: ['atrule'],
      style: { color: '#ce9178' },
    },
    {
      types: ['atrule rule'],
      style: { color: '#c586c0' },
    },
    {
      types: ['atrule url'],
      style: { color: '#9cdcfe' },
    },
    {
      types: ['atrule url function'],
      style: { color: '#dcdcaa' },
    },
    {
      types: ['atrule url punctuation'],
      style: { color: '#d4d4d4' },
    },
    {
      types: ['keyword'],
      style: { color: '#569cd6' },
    },
    {
      types: ['keyword.module', 'keyword.control-flow'],
      style: { color: '#c586c0' },
    },
    {
      types: ['function', 'function maybe-class-name'],
      style: { color: '#dcdcaa' },
    },
    {
      types: ['regex'],
      style: { color: '#d16969' },
    },
    {
      types: ['important'],
      style: { color: '#569cd6' },
    },
    {
      types: ['constant'],
      style: { color: '#9cdcfe' },
    },
    {
      types: ['class-name', 'maybe-class-name', 'builtin'],
      style: { color: '#4ec9b0' },
    },
    {
      types: ['console'],
      style: { color: '#9cdcfe' },
    },
    {
      types: ['parameter'],
      style: { color: '#9cdcfe' },
    },
    {
      types: ['interpolation'],
      style: { color: '#9cdcfe' },
    },
    {
      types: ['punctuation.interpolation-punctuation'],
      style: { color: '#569cd6' },
    },
    {
      types: ['boolean'],
      style: { color: '#569cd6' },
    },
    {
      types: ['property', 'variable', 'imports maybe-class-name', 'exports maybe-class-name'],
      style: { color: '#9cdcfe' },
    },
    {
      types: ['selector'],
      style: { color: '#d7ba7d' },
    },
    {
      types: ['escape'],
      style: { color: '#d7ba7d' },
    },
    {
      types: ['tag'],
      style: { color: '#569cd6' },
    },
    {
      types: ['tag punctuation'],
      style: { color: '#808080' },
    },
    {
      types: ['cdata'],
      style: { color: '#808080' },
    },
    {
      types: ['attr-name'],
      style: { color: '#9cdcfe' },
    },
    {
      types: ['attr-value', 'attr-value punctuation'],
      style: { color: '#ce9178' },
    },
    {
      types: ['attr-value punctuation.attr-equals'],
      style: { color: '#d4d4d4' },
    },
    {
      types: ['entity'],
      style: { color: '#569cd6' },
    },
    {
      types: ['namespace'],
      style: { color: '#4ec9b0' },
    },
  ],
};
