import StatusBadge from "@/components/pages/dashboard/role/admin/status/page";
import { CartStatisticsProps } from "@/interfaces/dashboard/admin";

export function CartStatistics({ cartsByStatus }: CartStatisticsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {Object.entries(cartsByStatus).map(([status, carts]) => (
        <div
          key={status}
          className="bg-gray-50 p-3 rounded-lg hover:shadow-sm transition-shadow"
        >
          <div className="flex justify-between items-center mb-2">
            <StatusBadge status={status} />
            <span className="text-lg font-bold text-gray-800">
              {carts.length}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {carts.reduce((total, cart) => total + cart.items.length, 0)} items
          </p>
        </div>
      ))}
    </div>
  );
}
