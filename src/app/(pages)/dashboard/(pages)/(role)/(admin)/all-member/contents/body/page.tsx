// app/(pages)/dashboard/(pages)/(role)/(admin)/all-member/contents/body/page.tsx
"use client";
import LoadingState from "@/components/loading";
import { Search } from "lucide-react";
import {
  useFilteredAndSortedMembers,
  useMemberExpand,
} from "@/services/client/dashboard/role/admin/all-member";
import { Header } from "../../../../../../../../../components/pages/dashboard/role/admin/header/page";
import { MemberCard } from "@/components/card/cardListMembers/page";

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
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {filteredAndSortedMembers.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <div className="text-gray-400 mb-2">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-500 text-lg">No members found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredAndSortedMembers.map((member) => (
            <MemberCard
              key={member.id_user}
              member={member}
              isExpanded={expandedMembers[member.id_user]}
              onToggle={() => toggleMember(member.id_user)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
