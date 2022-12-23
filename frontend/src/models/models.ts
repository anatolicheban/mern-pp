export type ItemCard = {
  id: string;
  image: string | null;
  title: string;
  location: string;
  date: string;
  price: number;
  currency: "USD" | "UAH" | "EUR";
  isLiked: boolean | undefined;
};

export interface Link {
  name: string;
  path: string;
}

export interface SingleUser {
  id: string;
  username: string;
  email: string;
  registerDate: string;
  adsAmount: number;
  verified: boolean;
}

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
