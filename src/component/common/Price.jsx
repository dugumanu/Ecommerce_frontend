export default function PriceComponent({ amount }) {
    const formatToIndianCurrency = (amount) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
      }).format(amount);
    };
  
    return <span>{formatToIndianCurrency(amount)}</span>;
  }
  