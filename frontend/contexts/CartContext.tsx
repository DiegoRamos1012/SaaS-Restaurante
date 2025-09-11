"use client";

import { createContext, useContext, useState } from "react";
import { CartContextType, CartItem, MenuItem, Addon } from "../types/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(item: MenuItem, addons?: Addon[]) {
    const addonsArray = addons ?? [];
    const addonsTotal = addonsArray.reduce((sum, a) => sum + a.price, 0);
    setCartItems((prev) => [
      ...prev,
      {
        menuItemId: item.id,
        image: item.image,
        name: item.name,
        quantity: 1,
        unitPrice: item.price,
        total: item.price + addonsTotal,
        addons: addonsArray,
      },
    ]);
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

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
      }}
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
