import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "@/utils/format";
import { Cart } from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { Info, Percent, Plus } from "lucide-react";
import { MenuItem, Addon } from "../../types/types";
import { useCart } from "@/contexts/CartContext";
import InfoModal from "@/components/Dialogs/InfoModal";
import AddonsModal from "@/components/Dialogs/AddonsModal";

export default function Menu() {
  const [menu, setMenu] = useState<MenuItem[] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [addonsModalVisible, setAddonsModalVisible] = useState(false);
  const [addonsItem, setAddonsItem] = useState<MenuItem | null>(null);
  const [allAddons, setAllAddons] = useState<Addon[]>([]);
  const { addToCart } = useCart();
  const categoryMap: Record<string, MenuItem[]> = {};
  if (menu) {
    menu.forEach((item) => {
      item.categories.forEach((cat: string) => {
        if (!categoryMap[cat]) categoryMap[cat] = [];
        categoryMap[cat].push(item);
      });
    });
  }
  const sections = Object.entries(categoryMap);

  useEffect(() => {
    async function getMenu() {
      try {
        const response = await axios.get("http://localhost:4000/api/menu", {
          timeout: 5000,
        });
        setMenu(response.data);
        const menuNames = response.data.map((item: MenuItem) => item.name);
        console.log(menuNames);
        if (response.status === 200) {
          console.log("Cardápio buscado com sucesso");
        }
      } catch (err) {
        console.error(`Erro: ${err}`);
      }
    }
    getMenu();
  }, []);

  useEffect(() => {
    async function fetchAddons() {
      const response = await axios.get("http://localhost:4000/api/addons");
      setAllAddons(response.data);
    }
    fetchAddons();
  }, []);

  if (!menu) {
    return <div className="text-center py-10">Carregando cardápio...</div>;
  }

  // TODO: Implementar feedback visual por Toast
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <header className="py-3 px-0 sm:px-4 bg-amber-800 text-white sticky top-0 z-10 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center px-3 sm:px-0">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold">Le Gourmet</h1>
              <p className="text-amber-200 italic text-sm">
                Culinária Contemporânea
              </p>
            </div>
            <div className="flex items-center">
              <Cart />
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2 md:mt-3 pb-1 overflow-x-auto whitespace-nowrap px-3 sm:px-0">
            {sections.map(([category], idx) => (
              <React.Fragment key={category}>
                <a
                  href={`#${category}`}
                  className="hover:text-amber-200 transition-colors text-sm"
                >
                  {category}
                </a>
                {idx < sections.length - 1 && (
                  <span className="text-amber-300">·</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-6 px-2 sm:px-3">
        <h2 className="text-2xl font-bold text-center mb-4 text-amber-900">
          Nosso Cardápio
        </h2>
        {sections.map(([category, items]) => (
          <section key={category} className="mb-8" id={category}>
            <h3 className="text-lg font-semibold mb-3 pb-1 border-b border-amber-300 text-amber-800">
              {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-200 flex flex-col h-full group relative"
                >
                  <div className="h-24 bg-amber-50 flex items-center justify-center relative">
                    <img
                      src={
                        item.image ||
                        "https://placehold.co/600x400/FFF8E1/cc7000?text=Le+Gourmet"
                      }
                      alt={item.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/600x400/FFF8E1/cc7000?text=Le+Gourmet";
                      }}
                    />
                    {item.onSale && (
                      <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-0.5 rounded-br">
                        <Percent size={17} />
                      </div>
                    )}
                  </div>
                  <div className="p-2 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-1 mr-1 hover:line-clamp-none group-hover:text-amber-700">
                        {item.name}
                      </h4>
                      <span className="font-bold text-amber-700 text-sm whitespace-nowrap">
                        {item.onSale && item.salePrice ? (
                          <>
                            <span className="line-through text-gray-400 text-xs mr-1">
                              {formatCurrency(item.price)}
                            </span>
                            {formatCurrency(item.salePrice)}
                          </>
                        ) : (
                          formatCurrency(item.price)
                        )}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs line-clamp-2 mb-1 group-hover:line-clamp-none transition-all duration-200">
                      {item.description}
                    </p>
                    <div className="mt-auto pt-1 flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {item.allergens &&
                          item.allergens.map((allergen: string) => (
                            <span
                              key={allergen}
                              className="inline-block bg-amber-50 text-amber-800 text-[10px] px-1 rounded"
                            >
                              {allergen}
                            </span>
                          ))}
                      </div>
                      <div className="flex space-x-3">
                        <Button
                          className="text-white bg-amber-600 hover:bg-amber-700 rounded-full p-0.5 w-8 h-8 min-w-0 flex transition-colors"
                          aria-label="Informações"
                          onClick={() => {
                            setSelectedItem(item);
                            setModalVisible(true);
                          }}
                        >
                          <Info size={16} />
                        </Button>
                        <Button
                          className="text-white bg-amber-600 hover:bg-amber-700 rounded-full p-0.5 w-8 h-8 min-w-0 flex transition-colors"
                          aria-label="Adicionar ao Carrinho"
                          onClick={() => {
                            if (item.addons && item.addons.length > 0) {
                              setAddonsItem(item);
                              setAddonsModalVisible(true);
                            } else {
                              addToCart(item);
                            }
                          }}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
      <InfoModal
        show={modalVisible}
        onHide={() => {
          setModalVisible(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />
      <AddonsModal
        show={addonsModalVisible}
        onHide={() => {
          setAddonsModalVisible(false);
          setAddonsItem(null);
        }}
        item={addonsItem}
        allAddons={allAddons}
      />
      <footer className="bg-amber-800 text-amber-100 py-4 px-4 mt-6">
        <div className="container mx-auto text-center">
          <p className="mb-2 text-sm">Le Gourmet - Culinária Contemporânea</p>
          <p className="text-sm">Aberto de Terça a Domingo, das 18h às 23h</p>
          <p className="text-sm mt-2">Rua das Delícias, 123 - Centro</p>
          <p className="text-sm">Reservas: (11) 91234-5678</p>
          <div className="mt-3 flex flex-col sm:flex-row justify-center items-center gap-2">
            <button className="bg-amber-700 hover:bg-amber-600 text-white py-1 px-3 rounded text-sm transition-colors">
              Fazer Reserva
            </button>
            <button className="bg-amber-700 hover:bg-amber-600 text-white py-1 px-3 rounded text-sm transition-colors">
              Delivery
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
