export type Product = {
  productTitle: string;
  selectableAttributes: {
    name: string;
    values: string[];
  }[];
  productVariants: ProductVariant[];
  baremList: Barem[];
};

export type Body = "M" | "L" | "XL";

export type Color = "Siyah" | "Lacivert";

export type Barem = {
  minimumQuantity: number;
  maximumQuantity: number;
  price: number;
};

export type ProductVariant = {
  id: string;
  attributes: {
    name: string;
    selectable: boolean;
    value: string;
  }[];
  images: string[];
};
