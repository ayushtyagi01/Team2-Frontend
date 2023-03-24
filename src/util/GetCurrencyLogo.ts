export const getCurrencyLogo = (currency: string): string => {
    if (currency === 'EUR') {
      return '€';
    } else if (currency === 'INR') {
      return '₹';
    } else {
      return '$';
    }
  };
  