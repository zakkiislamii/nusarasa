import { Cart } from "@/interfaces/dashboard/admin";

import {
  formatBalance,
  formatDateTime,
  calculateCartTotal,
} from "@/services/client/dashboard/role/admin/all-member";
import { CartItem } from "../CartItem/page";

interface CartDetailsProps {
  cart: Cart;
}

export function CartDetails({ cart }: CartDetailsProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl">
      <div className="flex flex-col sm:flex-row justify-between gap-2 mb-3">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
              Created: {formatDateTime(cart.createdAt)}
            </span>
            {cart.createdAt !== cart.updatedAt && (
              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                Updated: {formatDateTime(cart.updatedAt)}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full inline-block">
            Cart ID: {cart.id_cart.slice(-8)}
          </div>
        </div>
        <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full text-sm self-start sm:self-center">
          {formatBalance(calculateCartTotal(cart.items))}
        </span>
      </div>
      {cart.items.length > 0 ? (
        <div className="space-y-2">
          {cart.items.map((item) => (
            <CartItem key={item.id_cartItem} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg">
          <p className="text-gray-400 text-sm">No items in cart</p>
        </div>
      )}
    </div>
  );
}
