import { SortKey } from "@/services/client/dashboard/role/admin/all-member";

//F:\GitHub\nusarasa\src\interfaces\dashboard\admin\index.ts
export interface Seller {
  id_user: string;
  fullname: string;
  email: string;
  username: string;
  stores: Store[];
}
export interface ProductInfo {
  product_name: string;
  price: number;
}

export interface StoreInfo {
  store_name: string;
}
export interface Store {
  id_store: string;
  store_name: string;
  products: Product[];
}

export interface Product {
  id_product: string;
  product_name: string;
  price: number;
}

export interface CartStatisticsProps {
  cartsByStatus: Record<string, Cart[]>;
}

export interface CartDetailsProps {
  cart: Cart;
}

export interface CartItemProps {
  item: CartItem;
}

export interface Member {
  id_user: string;
  fullname: string | null;
  email: string;
  username: string;
  address: string | null;
  number_phone: string | null;
  balance: number;
  carts: Cart[];
}

export interface MemberCardProps {
  member: Member;
  isExpanded: boolean;
  onToggle: () => void;
}
export interface CartItemsProps {
  items: CartItem[];
}

export interface StatusBadgeProps {
  status: string;
}
export interface StatusBadgePropsValidate {
  status: string;
}

export interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: SortKey;
  setSortBy: (key: SortKey) => void;
}

export interface Cart {
  id_cart: string;
  id_user: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}

export interface CartItem {
  id_cartItem: string;
  quantity: number;
  id_cart: string;
  id_product: string;
  id_store: string;
  createdAt: string;
  updatedAt: string;
  product: ProductInfo;
  store: StoreInfo;
}
