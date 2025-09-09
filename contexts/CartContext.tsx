"use client";

import { createContext, useContext, useState } from "react";
import { MenuItem } from "@/types/types";

type CartItem = {
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (menuItemId: string) => void;
  changeQuantity: (menuItemId: string, delta: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(item: MenuItem) {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.menuItemId === item.id);
      if (exists) {
        return prev.map((i) =>
          i.menuItemId === item.id
            ? {
                ...i,
                quantity: i.quantity + 1,
                total: (i.quantity + 1) * i.unitPrice,
              }
            : i
        );
      }
      return [
        ...prev,
        {
          menuItemId: item.id,
          name: item.name,
          quantity: 1,
          unitPrice:
            item.onSale && item.salePrice ? item.salePrice : item.price,
          total: item.onSale && item.salePrice ? item.salePrice : item.price,
        },
      ];
    });
  }

  function removeFromCart(menuItemId: string) {
    setCartItems((prev) => prev.filter((i) => i.menuItemId !== menuItemId));
  }

  function changeQuantity(menuItemId: string, delta: number) {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.menuItemId === menuItemId
            ? {
                ...i,
                quantity: i.quantity + delta,
                total: (i.quantity + delta) * i.unitPrice,
              }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
    }
    
    function cleanAll(menu)

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, changeQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
