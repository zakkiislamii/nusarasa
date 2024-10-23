import { Product } from "@/interfaces/homepage/stores";
import { useState } from "react";
import { toast } from "sonner";

export const useHandleCardHome = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id_product] || 0;
    toast.info(`Added ${quantity} of ${product.product_name} to cart`);
  };
  return { handleQuantityChange, handleAddToCart };
};
