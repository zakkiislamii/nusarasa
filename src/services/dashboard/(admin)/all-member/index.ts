/* eslint-disable @typescript-eslint/no-explicit-any */
import { Member } from "@/interfaces/dashboard/admin";
import { getSession } from "@/utils/token/token";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export type SortKey = keyof Member;

export const useGetAllMember = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllMember = async () => {
      try {
        setLoading(true);
        const token = await getSession();
        const response = await axios.get("/api/admins/member", {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setMembers(response.data.data);
        }
      } catch (err) {
        toast.error(`${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMember();
  }, []);

  return { members, loading };
};

export const useFilteredAndSortedMembers = (
  initialSortBy: SortKey = "fullname"
) => {
  const { members, loading } = useGetAllMember();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>(initialSortBy);

  const filteredAndSortedMembers = useMemo(() => {
    return members
      .filter(
        (member: Member) =>
          member.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a: Member, b: Member) => {
        const aValue = a[sortBy] || "";
        const bValue = b[sortBy] || "";
        return aValue.toString().localeCompare(bValue.toString());
      });
  }, [members, searchTerm, sortBy]);

  return {
    filteredAndSortedMembers,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    loading,
  };
};
