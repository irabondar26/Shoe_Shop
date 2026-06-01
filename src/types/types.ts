export interface Product {
  id: number,
  name: string;
  brand: string;
  model: string;
  price: number;
  photo: string;
  rating: number;
  popularity: number;
  onSale: boolean,
  newPrice: number;
  audience: string;
  category: string;
  color: string;
}

export type FilterData = {
  brands: string[];
  categories: string[];
  color: string;
  maxPrice: number;
}