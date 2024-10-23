export interface Seller {
  id_user: string;
  fullname: string;
  email: string;
  username: string;
  stores: Store[];
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

export interface Member {
  id_user: string;
  fullname: string | null;
  email: string;
  username: string;
}


