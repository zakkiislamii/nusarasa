export interface Product {
  product_name: string;
  price: number;
  quantity: number;
}

export interface Store {
  store_name: string;
}

export interface CartItem {
  quantity: number;
  product: Product;
  store: Store;
}

export interface Cart {
  id_cart: string;
  status: string;
  createdAt: string;
  items: CartItem[];
}

export interface HistoryResponse {
  code: number;
  status: string;
  message: string;
  data: Cart[];
}
