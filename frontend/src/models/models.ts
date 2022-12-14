export type ItemCard = {
  _id: string;
  image: string | null;
  title: string;
  location: string;
  date: string;
  price: string;
  currency: "USD" | "UAH" | "EUR";
  isLiked: boolean | undefined;
};

export type GetSingleAdResult = Omit<ItemCard, "image"> & {
  description: string;
  images: string[];
  ownerUsername: string;
  ownerEmail: string;
  ownerRegDate: string;
  owner: string;
  categories: string[];
};

export interface Link {
  name: string;
  path: string;
}

export type GetAdsResult = {
  ads: ItemCard[];
  pages: number;
  count?: number;
};

export interface LoginQueryResult {
  accessToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  duplPassword: string;
}

export interface RegisterQueryResult {
  message: string;
}

export interface RefreshResult {
  accessToken: string;
}

export interface GetMyProfileresult {
  _id: string;
  username: string;
  email: string;
  verified: boolean;
  isAdmin: boolean;
  adsAmount: number;
  registrationDate: string;
}

export type SearchResult = { _id: string; title: string }[];

export type Currency = "UAH" | "USD" | "EUR";
