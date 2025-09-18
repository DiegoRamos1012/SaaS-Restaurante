"use client";

import { ShoppingCart, X, Minus, Plus } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { formatCurrency } from "@/utils/format";
import { useCart } from "@/contexts/CartContext";
import { useMemo } from "react";

export function Cart() {
  const { cartItems, removeFromCart, changeQuantity, clearCart } = useCart();

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.total, 0),
    [cartItems]
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="relative bg-amber-600 hover:bg-amber-700 rounded-full p-2 flex items-center justify-center h-9 w-9 md:h-10 md:w-10">
          <ShoppingCart />
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
            <ShoppingCart />
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
                  className="flex items-start py-4 gap-3"
                >
                  <img
                    src={item.image}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 truncate">
                      {item.name}
                    </div>

                    {/* Exibir addons se existirem */}
                    {item.addons && item.addons.length > 0 && (
                      <div className="mt-1 space-y-1">
                        {item.addons.map((addon, index) => (
                          <div
                            key={index}
                            className="text-xs text-gray-600 flex items-center gap-1"
                          >
                            <span>+</span>
                            <span>{addon.name}</span>
                            <span className="text-amber-600 font-medium">
                              {formatCurrency(addon.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center mt-2 gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={() => changeQuantity(item.menuItemId, -1)}
                        aria-label="Diminuir quantidade"
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="mx-2 text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6"
                        onClick={() => changeQuantity(item.menuItemId, 1)}
                        aria-label="Aumentar quantidade"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="font-bold text-amber-700">
                      {formatCurrency(item.total)}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 text-red-500"
                      onClick={() => removeFromCart(item.menuItemId)}
                      aria-label="Remover item"
                    >
                      <X size={16} />
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
              <Button
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-lg transition-colors text-lg shadow"
                aria-label="Finalizar Pedido"
              >
                Finalizar Pedido
              </Button>
              <SheetClose asChild>
                <Button
                  className="w-full bg-gray-100 hover:bg-gray-200 text-amber-800 font-semibold py-2 rounded-lg transition-colors text-base"
                  aria-label="Adicionar mais"
                >
                  Adicionar mais
                </Button>
              </SheetClose>
              <hr className="border-t border-amber-300" />
              <Button
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 rounded-lg transition-colors text-base"
                aria-label="Limpar carrinho"
                onClick={() => clearCart()}
              >
                Limpar carrinho
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
