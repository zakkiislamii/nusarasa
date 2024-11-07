// components/pages/dashboard/admin/member-list/MemberCard.tsx
import { Member } from "@/interfaces/dashboard/admin";
import { ChevronDown } from "lucide-react";

import {
  formatBalance,
  getCartsByStatus,
} from "@/services/client/dashboard/role/admin/all-member";
import StatusBadge from "@/components/pages/dashboard/role/admin/status/page";
import { CartStatistics } from "@/components/pages/dashboard/role/admin/CartStatistics/page";
import { CartDetails } from "@/components/pages/dashboard/role/admin/cartDetails/page";

interface MemberCardProps {
  member: Member;
  isExpanded: boolean;
  onToggle: () => void;
}

export function MemberCard({ member, isExpanded, onToggle }: MemberCardProps) {
  const cartsByStatus = getCartsByStatus(member.carts);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
      {/* Member Info Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          {member.fullname
            ? member.fullname[0].toUpperCase()
            : member.username[0].toUpperCase()}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-1 text-gray-800">
            {member.fullname || "No Name"}
          </h2>
          <p className="text-gray-600 text-sm">@{member.username}</p>
          <p className="text-gray-500 text-sm">{member.email}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="text-lg font-bold text-gray-800">
            {formatBalance(member.balance)}
          </div>
          <button
            onClick={onToggle}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors px-3 py-1 rounded-full hover:bg-blue-50"
          >
            {isExpanded ? "Hide" : "View"} Carts
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                isExpanded ? "transform rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <CartStatistics cartsByStatus={cartsByStatus} />

      {/* Expanded Cart Details */}
      {isExpanded && (
        <div className="mt-6 space-y-6">
          {Object.entries(cartsByStatus).map(
            ([status, carts]) =>
              carts.length > 0 && (
                <div key={status} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={status} />
                    <h3 className="text-sm font-semibold text-gray-700">
                      {status.charAt(0).toUpperCase() + status.slice(1)} Carts
                    </h3>
                  </div>
                  {carts.map((cart) => (
                    <CartDetails key={cart.id_cart} cart={cart} />
                  ))}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
