// Body.tsx
"use client";

import { useHistory } from "@/services/client/dashboard/role/member/history";

export default function Body() {
  const {
    history,
    isLoading,
    error,
    formatDate,
    formatCurrency,
    calculateTotal,
  } = useHistory();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <p className="text-red-500">
          {typeof error === "string" ? error : "An error occurred"}
        </p>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <p className="text-gray-500">Belum ada riwayat transaksi</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Riwayat Transaksi</h1>
      <div className="space-y-6">
        {history.map((cart) => (
          <div
            key={cart.id_cart}
            className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  ID Transaksi: {cart.id_cart}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(cart.createdAt)}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  cart.status === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {cart.status}
              </span>
            </div>

            <div className="divide-y divide-gray-200">
              {cart.items?.map((item, index) => (
                <div key={`${cart.id_cart}-${index}`} className="py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        {item.product?.product_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.store?.store_name}
                      </p>
                      <p className="text-sm">
                        {formatCurrency(item.product?.price || 0)} x{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatCurrency(
                        (item.product?.price || 0) * (item.quantity || 0)
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">
                  {formatCurrency(calculateTotal(cart.items || []))}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
