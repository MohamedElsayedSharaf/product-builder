import { product } from "../types";

export interface Iproduct {
  id?:  string;
  title: string;
  price: string;
  category: string;
  description: string;
  colors?: string[];
  image: string;
  rating: { rate: number; count: number };
}
export interface IinputList {
  id: string;
  name: product;
  label: string;
  type: string;
}
