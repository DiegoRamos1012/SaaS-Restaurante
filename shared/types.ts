export type Allergen =
  | 'Leite'
  | 'Ovos'
  | 'Amendoim'
  | 'Nozes'
  | 'Glúten'
  | 'Soja'
  | 'Camarão'
  | 'Gergelim'
  | 'Mostarda';
  
export type Categories =
  | "Bebidas"
  | "Vegano"
  | "Entradas"
  | "Pratos Principais"
  | "Acompanhamentos"
  | "Sobremesas";

export type MenuSection = {
  category: string;
  items: MenuItem[];
};

export type CartItem = {
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (menuItemId: string) => void;
  changeQuantity: (menuItemId: string, delta: number) => void;
  clearCart: () => void;
};

/*----------------------------------------------------------------------------------------------------------- */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  categories: string[];
  availability?: string;
  preparationTime?: number;
  addons?: { id: string; name: string; price?: number }[];
  allergens?: Allergen[];
  onSale?: boolean;
  salePrice?: number;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  addons?: {
    id: string;
    name: string;
    price?: number;
  }[];
  total: number; // quantity * (price + addons)
}

export interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  total: number;
  createdAt: Date;
}

export interface Table {
  id: string;
  number: number;
  qrCodeUrl?: string; // url Qr-code 
}
