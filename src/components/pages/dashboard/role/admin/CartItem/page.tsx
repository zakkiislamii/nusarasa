import { CartItem as CartItemType } from "@/interfaces/dashboard/admin";
import { formatBalance } from "@/services/client/dashboard/role/admin/all-member";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="font-semibold text-gray-800">
          {item.product.product_name}
        </span>
        <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded text-sm">
          {formatBalance(item.product.price)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {item.store.store_name}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
          <span className="text-sm font-medium text-blue-600">
            {formatBalance(item.quantity * item.product.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
