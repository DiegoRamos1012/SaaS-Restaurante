import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Addon, MenuItem } from "../../types/types";
import { formatCurrency } from "@/utils/format";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";

interface AddonsModalProps {
  show: boolean;
  onHide: () => void;
  item: MenuItem | null;
  allAddons: Addon[];
}

const AddonsModal: React.FC<AddonsModalProps> = ({
  show,
  onHide,
  item,
  allAddons,
}) => {
  const { addToCart, cartItems } = useCart();
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

  useEffect(() => {
    if (!show) setSelectedAddons([]);
  }, [show]);

  // Return condicional DEPOIS de todos os hooks
  if (!item || !item.addons || item.addons.length === 0) return null;

  // Filtra os addons elegíveis para o item
  const eligibleAddons = allAddons.filter((addon) =>
    item.addons?.some((itemAddon: any) => itemAddon.id === addon.id)
  );

  const handleAddAddon = (addon: Addon) => {
    if (!selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons((prev) => [...prev, addon]);
    }
  };

  const handleRemoveAddon = (addonId: string) => {
    setSelectedAddons((prev) => prev.filter((a) => a.id !== addonId));
  };

  const handleAddToCart = () => {
    // Verificar se já existe no carrinho com os mesmos acompanhamentos
    const existingItem = cartItems.find((cartItem) => {
      if (cartItem.menuItemId !== item.id) return false;
      
      // Comparar acompanhamentos
      const cartAddons = cartItem.addons || [];
      
      if (cartAddons.length !== selectedAddons.length) return false;
      
      // Verificar se todos os addons são iguais
      return selectedAddons.every(addon => 
        cartAddons.some(cartAddon => cartAddon.id === addon.id)
      );
    });

    if (existingItem) {
      const addonsText = selectedAddons.length > 0 
        ? ` com os mesmos acompanhamentos` 
        : ` sem acompanhamentos`;
      
      toast.warning(`${item.name}${addonsText} já está no carrinho!`, {
        description: "Use os botões do carrinho para alterar a quantidade.",
        duration: 3000,
      });
      return;
    }

    addToCart(item, selectedAddons);

    // Toast notification
    const addonsText =
      selectedAddons.length > 0
        ? ` com ${selectedAddons.length} acompanhamento${
            selectedAddons.length > 1 ? "s" : ""
          }`
        : "";

    toast.success(`${item.name}${addonsText} adicionado ao carrinho!`, {
      description:
        selectedAddons.length > 0
          ? `Acompanhamentos: ${selectedAddons
              .map((addon) => addon.name)
              .join(", ")}`
          : undefined,
      duration: 3000,
    });

    onHide();
    setSelectedAddons([]);
  };

  return (
    <Dialog
      open={show}
      onOpenChange={(open) => {
        if (!open) onHide();
      }}
    >
      <DialogContent className="bg-amber-50 max-w-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Algo pra acompanhar?</DialogTitle>
          <DialogDescription>
            Deixe seu pedido melhor com estes acompanhamentos!
          </DialogDescription>
        </DialogHeader>
        <ul className="flex flex-col gap-2 mt-2">
          {eligibleAddons.map((addon) => (
            <li key={addon.id} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={addon.image}
                  alt={addon.name}
                  className="w-8 h-8 rounded object-cover border"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/64x64/FFF8E1/cc7000?text=Addon";
                  }}
                />
                <span>
                  {addon.name}{" "}
                  <span className="text-xs text-gray-500">
                    {formatCurrency(addon.price)}
                  </span>
                </span>
              </div>
              <Button
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => handleAddAddon(addon)}
                disabled={selectedAddons.some((a) => a.id === addon.id)}
              >
                <Plus />
              </Button>
            </li>
          ))}
        </ul>

        {/* Seção de addons selecionados */}
        {selectedAddons.length > 0 && (
          <div className="mt-6">
            <div className="font-semibold mb-2">
              Acompanhamentos selecionados:
            </div>
            <ul className="flex flex-col gap-2">
              {selectedAddons.map((addon) => (
                <li
                  key={addon.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={addon.image}
                      alt={addon.name}
                      className="w-8 h-8 rounded object-cover border"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/64x64/FFF8E1/cc7000?text=Addon";
                      }}
                    />
                    <span>
                      {addon.name}{" "}
                      <span className="text-xs text-gray-500">
                        {formatCurrency(addon.price)}
                      </span>
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                    onClick={() => handleRemoveAddon(addon.id)}
                  >
                    <Minus />
                  </Button>
                </li>
              ))}
            </ul>
            <Button
              className="mt-4 w-full bg-amber-700 hover:bg-amber-800 text-white"
              onClick={handleAddToCart}
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddonsModal;
