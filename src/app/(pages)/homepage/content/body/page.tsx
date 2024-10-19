"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useGetAllStores } from "@/services/homepage/stores";
import LoadingState from "@/components/loading";
import { Product, Store } from "@/interfaces/homepage/stores";

export default function Body() {
  const { stores, isLoading, error } = useGetAllStores();
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  if (isLoading) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  // Filtered list of stores
  const filteredStores = stores as any as Store[];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Stores</h1>

      {/* Display list of stores */}
      {!selectedStore && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStores.map((store: Store) => (
            <div
              key={store.id_store}
              className="bg-white rounded-lg shadow-md border-black overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedStore(store)}
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

      {/* Display products of the selected store */}
      {selectedStore && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button
            className="mb-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={() => setSelectedStore(null)} // Go back to store list
          >
            Back to Stores
          </button>
          <h2 className="text-2xl font-semibold mb-4">
            Products in {selectedStore.store_name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {selectedStore.products.map((product: Product) => (
              <div
                key={product.id_product}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 truncate">
                    {product.product_name}
                  </h3>
                  <p className="text-lg font-bold text-green-600 mb-2">
                    Rp {product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
