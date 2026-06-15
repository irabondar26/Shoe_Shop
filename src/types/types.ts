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
  sizes: ProductSize[];
  addInfo?: string[];
  reviews?: Review[];
}

interface ProductSize {
  value: number;
  isAvailable: boolean;
}

interface Review {
  id: number,
  userName: string,
  userRating: number,
  comment: string,
  date: string
}

export interface NavigationItem {
  name: string;
  id: string;
  to: string;
  submenu?: string[];
}

export type FilterData = {
  brands: string[];
  categories: string[];
  color: string;
  maxPrice: number;
}

export type ItemProps = {
  id: number,
  name: string;
  price: number;
  photo: string;
  rating: number;
  popularity: number,
  onSale: boolean,
  newPrice: number
}

export type ButtonProps = {
  text: string;
  active: boolean;
  customClass: string;
  addContent?: React.ReactNode;
  onClick?: () => void;
}

export type DropdownProps = {
  category?: string;
  data: Product[];
}

export type FilterProps = {
  setIsFilterOpen: (value: boolean) => void;
  setAppliedFilterData: (value: FilterData) => void;
  data: Product[];
  appliedFilterData: FilterData;
}

export type SliderProps = {
  title: string;
  data: Product[];
}

export interface ProductRatingProps {
  rating: number;
}

interface CartItem extends Product {
  selectedSize: number;
  quantity: number;
}

 export interface CartState {
  items: CartItem[];
}