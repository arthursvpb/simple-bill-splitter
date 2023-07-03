const isValidNumber = number => !Number.isNaN(parseFloat(number));

export const maskCurrency = number => {
  if (!isValidNumber) return 0;

  const numberString = String(number);

  if (numberString.length < 2) return numberString;

  const lastTwoDigits = numberString.slice(-2);
  const remainingDigits = numberString.slice(0, -2);
  const numberWithDecimal = `${remainingDigits || 0}.${lastTwoDigits}`;

  return numberWithDecimal
    .split('')
    .reduceRight((accumulator, char, index) => {
      const isDecimal = char === '.';
      const currentIndex = numberWithDecimal.length - 1 - index;
      const shouldAddComma =
        !isDecimal && currentIndex > 0 && currentIndex % 3 === 0;

      return [char, ...(shouldAddComma ? [','] : []), ...accumulator];
    }, [])
    .join('')
    .replace(',.', '.');
};

export const unmaskCurrency = currencyString =>
  parseFloat(currencyString.replace(/[,.]/g, ''));
