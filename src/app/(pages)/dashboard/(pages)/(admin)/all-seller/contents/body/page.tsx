"use client";
import LoadingState from "@/components/loading";
import { Product, Seller, Store } from "@/interfaces/dashboard/admin";
import { useGetAllSeller } from "@/services/dashboard/(admin)/all-seller";

export default function Body() {
  const { sellers, loading } = useGetAllSeller();

  if (loading) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Sellers</h1>
      {sellers.map((seller: Seller) => (
        <div
          key={seller.id_user}
          className="mb-6 bg-white shadow-md rounded-lg p-4"
        >
          <h2 className="text-xl font-semibold mb-2">{seller.fullname}</h2>
          <p>
            <strong>Email:</strong> {seller.email}
          </p>
          <p>
            <strong>Username:</strong> {seller.username}
          </p>
          <div className="mt-4 gap-5 flex flex-col">
            {seller.stores.map((store: Store) => (
              <details key={store.id_store} className="mb-2">
                <summary className="cursor-pointer font-medium">
                  {store.store_name}
                </summary>
                <table className="w-full mt-2">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-2">Product Name</th>
                      <th className="text-left p-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store.products.map((product: Product) => (
                      <tr key={product.id_product}>
                        <td className="p-2">{product.product_name}</td>
                        <td className="p-2">
                          Rp {product.price.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
