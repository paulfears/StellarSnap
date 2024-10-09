export const formatWalletAddress = (
  str: string,
  first: number,
  last: number
) => {
  if (str.length <= 6) {
    return str;
  }

  let firstThree = str.substring(0, first);
  let lastThree = str.substring(str.length - last);
  let middleDots = "...";

  return firstThree + middleDots + lastThree;
};

export const formatWalletAddValue = (str: string) => {
  console.log('formatWalletAddValue', str);
  if (!str) {
    return "";
  }
  const parts = str.split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const decimalPart = parts[1];
  return `${integerPart}.${decimalPart}`;
};
