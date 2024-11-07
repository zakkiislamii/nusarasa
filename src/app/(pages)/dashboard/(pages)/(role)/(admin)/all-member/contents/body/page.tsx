//F:\GitHub\nusarasa\src\app\(pages)\dashboard\(pages)\(role)\(admin)\all-member\contents\body\page.tsx
"use client";
import LoadingState from "@/components/loading";
import StatusBadge from "@/components/pages/dashboard/role/admin/status/page";
import { Member } from "@/interfaces/dashboard/admin";
import {
  useFilteredAndSortedMembers,
  SortKey,
  formatBalance,
  calculateCartTotal,
  getCartsByStatus,
  formatDateTime,
  useMemberExpand,
} from "@/services/client/dashboard/role/admin/all-member";
import { Search, SortAsc, ChevronDown } from "lucide-react";

export default function Body() {
  const {
    filteredAndSortedMembers,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    loading,
  } = useFilteredAndSortedMembers();

  const { expandedMembers, toggleMember } = useMemberExpand();

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
          Member List
        </h1>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search members..."
              className="pl-10 p-2 border rounded-full w-full sm:w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              className="pl-10 p-2 border rounded-full appearance-none pr-8 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none cursor-pointer"
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              value={sortBy}
            >
              <option value="fullname">Sort by Name</option>
              <option value="username">Sort by Username</option>
              <option value="email">Sort by Email</option>
              <option value="balance">Sort by Balance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Member Cards */}
      {filteredAndSortedMembers.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <div className="text-gray-400 mb-2">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-500 text-lg">No members found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredAndSortedMembers.map((member: Member) => {
            const cartsByStatus = getCartsByStatus(member.carts);
            const isExpanded = expandedMembers[member.id_user];

            return (
              <div
                key={member.id_user}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
              >
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
                      onClick={() => toggleMember(member.id_user)}
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

                {/* Cart Statistics */}
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
                        {carts.reduce(
                          (total, cart) => total + cart.items.length,
                          0
                        )}{" "}
                        items
                      </p>
                    </div>
                  ))}
                </div>

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
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}{" "}
                                Carts
                              </h3>
                            </div>
                            {carts.map((cart) => (
                              <div
                                key={cart.id_cart}
                                className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl"
                              >
                                <div className="flex flex-col sm:flex-row justify-between gap-2 mb-3">
                                  <div className="flex flex-col gap-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                                        Created:{" "}
                                        {formatDateTime(cart.createdAt)}
                                      </span>
                                      {cart.createdAt !== cart.updatedAt && (
                                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                                          Updated:{" "}
                                          {formatDateTime(cart.updatedAt)}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full inline-block">
                                      Cart ID: {cart.id_cart.slice(-8)}
                                    </div>
                                  </div>
                                  <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full text-sm self-start sm:self-center">
                                    {formatBalance(
                                      calculateCartTotal(cart.items)
                                    )}
                                  </span>
                                </div>
                                {cart.items.length > 0 ? (
                                  <div className="space-y-2">
                                    {cart.items.map((item) => (
                                      <div
                                        key={item.id_cartItem}
                                        className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                      >
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
                                            <span className="text-xs text-gray-500">
                                              Qty: {item.quantity}
                                            </span>
                                            <span className="text-sm font-medium text-blue-600">
                                              {formatBalance(
                                                item.quantity *
                                                  item.product.price
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-center py-8 bg-white rounded-lg">
                                    <p className="text-gray-400 text-sm">
                                      No items in cart
                                    </p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
