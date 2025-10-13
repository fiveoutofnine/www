const formatValueToPrecision = (
  value: number,
  decimals: number,
  toExponential: boolean,
): string => {
  if (value === 0) return '0';
  if (value >= 1e15) return value.toPrecision(decimals + 1);
  if (value >= 1e12) return `${(value / 1e12).toPrecision(decimals + 1)}T`;
  if (value >= 1e9) return `${(value / 1e9).toPrecision(decimals + 1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toPrecision(decimals + 1)}M`;
  if (value >= 1e4) return `${(value / 1e3).toPrecision(decimals + 1)}k`;
  if (value < 1 / 10 ** decimals)
    return toExponential ? value.toExponential(decimals) : value.toPrecision(decimals);
  return (Math.round(value * 10 ** decimals) / 10 ** decimals).toString();
};

export default formatValueToPrecision;
