export const formatPrices = (price: number) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const generateAvatar = (email: string) => {
  return `https://ui-avatars.com/api/?background=EA8143&color=fff&name=${email}`;
};

export const formatNumber = (value: number) => {
  return value.toLocaleString("en-IN", {
    maximumSignificantDigits: 3,
  });
};
