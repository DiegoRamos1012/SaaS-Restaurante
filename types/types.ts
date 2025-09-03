export type Allergen =
  | 'milk'
  | 'eggs'
  | 'peanuts'
  | 'tree-nuts'
  | 'gluten'
  | 'soy'
  | 'shellfish'
  | 'sesame'
  | 'mustard';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categories?: string[];
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
