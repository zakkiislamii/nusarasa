/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/interfaces/dashboard/seller";
import { getSession } from "@/utils/token/token";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";

export const useGetAllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getSession();
        const response = await axios.get("/api/products", {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const formattedProducts = response.data.data.stores.flatMap(
            (store: any) =>
              store.products.map((product: any) => ({
                id_store: store.id_store,
                store_name: store.store_name,
                id_product: product.id_product,
                product_name: product.product_name,
                price: product.price,
              }))
          );
          setProducts(formattedProducts);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
        toast.error(`Error fetching products: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const stores = useMemo(
    () => Array.from(new Set(products.map((product) => product.store_name))),
    [products]
  );

  const filteredProducts = useMemo(
    () =>
      selectedStore
        ? products.filter((product) => product.store_name === selectedStore)
        : products,
    [products, selectedStore]
  );

  const handleStoreChange = (store: string | null) => {
    setSelectedStore(store);
  };

  return {
    products: filteredProducts,
    allProducts: products,
    stores,
    selectedStore,
    setSelectedStore: handleStoreChange,
    loading,
    error,
  };
};
