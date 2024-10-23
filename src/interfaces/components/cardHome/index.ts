import { Product } from "@/interfaces/homepage/stores";

export interface CardHomeProps {
  product: Product;
  onQuantityChange?: (quantity: number) => void;
  onAddToCart?: () => void;
}
