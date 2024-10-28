import { Product } from "@/interfaces/homepage";

export interface CardHomeProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}
