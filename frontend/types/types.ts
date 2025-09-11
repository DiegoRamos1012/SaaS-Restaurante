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
  image: string;
  name: string;
  quantity: number;
  addons?: Addon[];
  unitPrice: number;
  total: number;
};

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, addons?: Addon[]) => void;
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
  isAddonElegible?: boolean;
  addons?: string[];
  allergens?: Allergen[];
  onSale?: boolean;
  salePrice?: number;
}
export interface Addon {
  id: string;
  image: string
  name: string;
  price: number;
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
  createdAt: string; 
}

export interface Table {
  id: string;
  number: number;
  qrCodeUrl?: string; // url Qr-code 
}
