// NOTE: if all fields have a string type: ... = Record<string, string> (Record<key, value>)
export type FetchPizzas = {
  currentPage: number;
  category: string;
  searchItems: string;
  sortBy: string;
  order: 'asc' | 'desc';
};

export type PizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  status: Status;
  items: PizzaItem[];
}

export type SearchPizzaParams = {
  currentPage: string;
  category: string;
  searchItems: string;
  sortBy: string;
  order: string;
};
