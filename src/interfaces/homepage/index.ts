export interface Store {
  id_store: string;
  id_user: string;
  store_name: string;
  products: Product[];
}

export interface Product {
  id_product: string;
  product_name: string;
  price: number;
  quantity: number;
}

export interface FormattedProduct {
  id_store: string;
  store_name: string;
  id_product: string;
  product_name: string;
  price: number;
}

// Create a store management store
export interface StoreState {
  stores: Store[];
  setStores: (stores: Store[]) => void;
  updateProductStock: (productId: string, quantityChange: number) => void;
}
