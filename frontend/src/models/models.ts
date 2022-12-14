export type ItemCard = {
  id: number | string;
  image: string;
  title: string;
  location: string;
  date: string;
  price: number;
  currency: "USD" | "UAH" | "EUR";
  isLiked: boolean;
};

export interface Location {
  id: number;
  name: string;
}
