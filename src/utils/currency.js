export const maskCurrency = value => {
  const numericValue = value.replace(/[^\d.-]/g, '');
  const cents = numericValue.padStart(2, '0');
  const formattedCents = cents.slice(0, -2) || '0';
  const formattedCentsDecimals = cents.slice(-2);
  const formattedDollars = formattedCents.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${formattedDollars},${formattedCentsDecimals}`;
};

export const unmaskCurrency = value => {
  const [dollars, cents] = value.split(',');
  const numericValue = `${dollars.replace(/[^\d.-]/g, '')}${cents || '00'}`;
  return numericValue;
};
