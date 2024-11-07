import { Search, SortAsc } from "lucide-react";
import { SortKey } from "@/services/client/dashboard/role/admin/all-member";
import { HeaderProps } from "@/interfaces/dashboard/admin";

export function Header({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
}: HeaderProps) {
  return (
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
  );
}
