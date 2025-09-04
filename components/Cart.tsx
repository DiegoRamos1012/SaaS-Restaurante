"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";
import { mockOrderItems } from "@/data/mockedData";
import { formatCurrency } from "@/utils/format";

export function Cart() {
  const [cartItems, setCartItems] = useState(mockOrderItems);

  const removeItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.menuItemId !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.menuItemId === itemId
          ? {
              ...item,
              quantity: newQuantity,
              total:
                newQuantity * item.unitPrice +
                (item.addons?.reduce(
                  (sum, addon) => sum + (addon.price || 0),
                  0
                ) || 0),
            }
          : item
      )
    );
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative bg-amber-600 hover:bg-amber-700 rounded-full p-2 flex items-center justify-center h-9 w-9 md:h-10 md:w-10">
          <Avatar className="h-5 w-5 md:h-6 md:w-6">
            <AvatarImage src="/online-shopping.png" alt="Cart" />
            <AvatarFallback>Cart</AvatarFallback>
          </Avatar>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-white px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto"
      >
        <SheetTitle className="text-2xl font-bold mb-5 text-amber-800 flex items-center gap-2">
          <span className="inline-block p-1">
            <Avatar className="bg-amber-600 rounded-full p-1 flex items-center justify-center h-9 w-9">
              <AvatarImage
                src="/online-shopping.png"
                alt="Cart"
                className="h-6 w-6"
              />
              <AvatarFallback>Carrinho</AvatarFallback>
            </Avatar>
          </span>
          Seus Pedidos
        </SheetTitle>

        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
            <SheetClose asChild>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                Adicionar itens
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="divide-y divide-amber-100 mb-6 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.menuItemId}
                  className="flex items-center py-4 gap-3"
                >
                  <img
                    src="https://placehold.co/300x300/FFF8E1/cc7000?text=Item"
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 truncate">
                      {item.name}
                    </div>
                    {item.addons && item.addons.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {item.addons.map((addon) => addon.name).join(", ")}
                      </div>
                    )}
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.menuItemId, item.quantity - 1)
                        }
                        className="w-6 h-6 bg-amber-100 rounded-full text-amber-800 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="mx-2 text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.menuItemId, item.quantity + 1)
                        }
                        className="w-6 h-6 bg-amber-100 rounded-full text-amber-800 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-amber-700">
                      {formatCurrency(item.total)}
                    </div>
                    <Button
                      onClick={() => removeItem(item.menuItemId)}
                      className="mt-2 bg-transparent hover:bg-red-50 text-red-500 hover:text-red-700 p-1 h-auto rounded-full transition-colors"
                      title="Remover item"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 6l12 12M6 18L18 6" />
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-amber-200 pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-800">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Taxa de entrega</span>
                <span className="font-medium text-gray-800">Grátis</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-dashed border-amber-100">
                <span className="text-lg font-semibold text-gray-800">
                  Total
                </span>
                <span className="text-xl font-bold text-amber-800">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-lg transition-colors text-lg shadow">
                Finalizar Pedido
              </Button>
              <SheetClose asChild>
                <Button className="w-full bg-gray-100 hover:bg-gray-200 text-amber-800 font-semibold py-2 rounded-lg transition-colors text-base">
                  Adicionar mais
                </Button>
              </SheetClose>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
