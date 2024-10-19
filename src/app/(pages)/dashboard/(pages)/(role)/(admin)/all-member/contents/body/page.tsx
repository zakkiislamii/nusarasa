"use client";
import LoadingState from "@/components/loading";
import {
  useFilteredAndSortedMembers,
  SortKey,
} from "@/services/dashboard/role/admin/all-member";

export default function Body() {
  const {
    filteredAndSortedMembers,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    loading,
  } = useFilteredAndSortedMembers();

  if (loading) {
    return (
      <>
        <LoadingState />
      </>
    );
  }
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Member List</h1>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search members..."
          className="p-2 border rounded w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          onChange={(e) => setSortBy(e.target.value as SortKey)}
          value={sortBy}
        >
          <option value="fullname">Sort by Name</option>
          <option value="username">Sort by Username</option>
          <option value="email">Sort by Email</option>
        </select>
      </div>

      {filteredAndSortedMembers.length === 0 ? (
        <p className="text-center text-gray-500">No members found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedMembers.map((member) => (
            <div
              key={member.id_user}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                {member.fullname
                  ? member.fullname[0].toUpperCase()
                  : member.username[0].toUpperCase()}
              </div>
              <h2 className="text-xl font-semibold mb-2">
                {member.fullname || "N/A"}
              </h2>
              <p className="text-gray-600 mb-1">@{member.username}</p>
              <p className="text-gray-500 text-sm">{member.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
