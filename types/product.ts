export type ProductSize = "S" | "M" | "L" | "XL";
export type ProductColor = "blanc" | "noir" | "bleu" | "rouge";

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  image: string;
  cotonBio: boolean;
  editionLimitee: boolean;
  category: string;
  sizes: ProductSize[];
  colors: ProductColor[];
}