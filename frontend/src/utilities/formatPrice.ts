export type Currency = "USD" | "UAH" | "EUR";

export const formatPrice = (price: number, currency: Currency): string => {
  if (currency === "EUR") {
    return ` ${price + " €"}`;
  } else if (currency === "UAH") {
    return ` ${price + " ₴"}`;
  }
  return ` ${price + " $"}`;
};
