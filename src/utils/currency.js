export const maskCurrency = value => {
  const numericValue = value.replace(/[^\d.-]/g, '');
  const [dollars, cents] = numericValue.split('.');
  const formattedDollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return cents ? `${formattedDollars}.${cents}` : formattedDollars;
};

export const unmaskCurrency = value => value.replace(/[^\d.-]/g, '');
