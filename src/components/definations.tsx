export interface MyUser {
  email: string;
  name?: string;
}
export interface NavBarProps {
  user: MyUser | null;
  handleSetUser: (USER: MyUser | null) => void;
}
export interface LoginProps {
  handleSetUser: (USER: MyUser | null) => void;
}
export interface Product {
  id: string;
  image: string;
  price: number;
  title: string;
}
export interface Item {
  product: Product;
}
export interface Items {
  items: Product[];
}
export interface ErrorPageProps {
  message: string;
}
