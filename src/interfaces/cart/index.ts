// Interface yang sudah ada
export interface FormAddToCart {
  user_id: string;
  product_id: string;
  quantity: number;
}

export interface CartItemsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface Product {
  id_product: string;
  product_name: string;
  price: number;
  quantity: number;
  id_store: string;
}

export interface Store {
  id_store: string;
  store_name: string;
  id_user: string;
}

export interface CartItem {
  id_cartItem: string;
  id_cart: string;
  quantity: number;
  product: Product;
  store: Store;
}

export interface CheckoutRequest {
  id_user: string;
  id_cart: string;
}

export interface EditingState {
  [key: string]: boolean;
}

export interface QuantityState {
  [key: string]: number;
}
