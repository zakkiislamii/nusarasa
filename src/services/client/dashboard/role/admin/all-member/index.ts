
import { Cart, CartItem, Member } from "@/interfaces/dashboard/admin";
import { getSession } from "@/utils/token/token";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export type SortKey = "fullname" | "username" | "email" | "balance";

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

export const useMemberExpand = () => {
  const [expandedMembers, setExpandedMembers] = useState<
    Record<string, boolean>
  >({});

  const toggleMember = (memberId: string) => {
    setExpandedMembers((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  return {
    expandedMembers,
    toggleMember,
  };
};
export const formatBalance = (balance: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(balance);
};

// Get active cart count
export const getActiveCartCount = (carts: Cart[]) => {
  return carts.filter((cart) => cart.status === "active").length;
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

export const getTotalItems = (carts: Cart[]) => {
  return carts.reduce((total, cart) => {
    return (
      total +
      cart.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0)
    );
  }, 0);
};

export const calculateCartTotal = (items: CartItem[]) => {
  return items.reduce((total, item) => {
    return total + item.quantity * item.product.price;
  }, 0);
};

export const getCartsByStatus = (carts: Cart[]) => {
  const statusMap: Record<string, Cart[]> = {
    active: [],
    checkout: [],
    completed: [],
    cancelled: [],
  };

  carts.forEach((cart) => {
    if (statusMap[cart.status]) {
      statusMap[cart.status].push(cart);
    }
  });

  return statusMap;
};

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};
