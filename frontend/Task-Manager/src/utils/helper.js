const validateEmail = (email) => {
  const ragex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return ragex.test(email);
};

export default validateEmail;

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [isIntegerPart, fractionalPart] = num.toString().split(".");

  const formattedInteger = isIntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};
