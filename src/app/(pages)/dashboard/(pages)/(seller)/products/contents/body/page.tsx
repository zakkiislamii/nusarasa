"use client";
import LoadingState from "@/components/loading";
import { useGetAllProducts } from "@/services/dashboard/(seller)/products";

export default function Body() {
  const { products, stores, selectedStore, setSelectedStore, loading, error } =
    useGetAllProducts();

  if (loading)
    return (
      <>
        <LoadingState />
      </>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <select
        className="mb-4 p-2 border rounded"
        onChange={(e) => setSelectedStore(e.target.value || null)}
        value={selectedStore || ""}
      >
        <option value="">All Products</option>
        {stores.map((store) => (
          <option key={store} value={store}>
            {store}
          </option>
        ))}
      </select>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id_product} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{product.product_name}</h2>
              <p className="text-gray-600">{product.store_name}</p>
              <p className="text-lg font-bold mt-2">
                Rp {product.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
