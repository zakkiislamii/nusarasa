// F:\GitHub\nusarasa\src\app\(pages)\homepage\content\body\page.tsx

"use client";
import React, { useState } from "react";
import { useGetAllStores } from "@/services/client/homepage/stores";
import LoadingState from "@/components/loading";
import { Product, Store } from "@/interfaces/homepage";
import CardHome from "@/components/card/cardHome";
import { useHandleCardHome } from "@/services/client/homepage/cardHome";

export default function Body() {
  const { stores, setStores, isLoading, error } = useGetAllStores();
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const { handleQuantityChange, handleAddToCart, quantities, isAuthenticated } =
    useHandleCardHome();

  if (isLoading) return <LoadingState />;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!isAuthenticated)
    return <div className="text-center py-8">Please login to continue</div>;

  const handleStoreSelect = (store: Store) => {
    setSelectedStore(store);
  };

  const updateLocalStock = (productId: string, quantityToReduce: number) => {
    // Update stores data
    const updatedStores = stores.map((store) => ({
      ...store,
      products: store.products.map((product) =>
        product.id_product === productId
          ? { ...product, quantity: product.quantity - quantityToReduce }
          : product
      ),
    }));

    // Update selected store if it exists
    if (selectedStore) {
      const updatedSelectedStore = updatedStores.find(
        (store) => store.id_store === selectedStore.id_store
      );
      if (updatedSelectedStore) {
        setSelectedStore(updatedSelectedStore);
      }
    }

    setStores(updatedStores);
  };

  const handleCartAdd = async (product: Product) => {
    const quantity = quantities[product.id_product] || 0;
    const success = await handleAddToCart(product);

    if (success) {
      // Update local stock only if the API call was successful
      updateLocalStock(product.id_product, quantity);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Stores</h1>

      {!selectedStore && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stores.map((store) => (
            <div
              key={store.id_store}
              className="bg-white rounded-lg shadow-md border-black overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => handleStoreSelect(store)}
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 truncate">
                  {store.store_name}
                </h2>
                <p className="text-gray-600 mb-2">Click to view products</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedStore && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button
            className="mb-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={() => setSelectedStore(null)}
          >
            Back to Stores
          </button>
          <h2 className="text-2xl font-semibold mb-4">
            Products in {selectedStore.store_name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {selectedStore.products.map((product: Product) => (
              <CardHome
                key={product.id_product}
                product={product}
                quantity={quantities[product.id_product] || 0}
                onQuantityChange={(quantity) =>
                  handleQuantityChange(product.id_product, quantity)
                }
                onAddToCart={() => handleCartAdd(product)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
