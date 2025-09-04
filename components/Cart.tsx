import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "./ui/button";

export function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="mx-auto bg-amber-600 hover:bg-amber-700 rounded-full p-2 flex items-center justify-center h-10 w-10">
          <AvatarImage
            src="/online-shopping.png"
            alt="Cart"
            className="h-6 w-6"
          />
          <AvatarFallback>Carrinho</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side="right" className="max-w-sm w-full bg-white px-6 py-8">
        <h2 className="text-2xl font-bold mb-4 text-amber-800 flex items-center gap-2">
          <span className="inline-block p-2">
            <Avatar className="mx-auto bg-amber-600 hover:bg-amber-700 rounded-full p-2 flex items-center justify-center h-10 w-10">
              <AvatarImage
                src="/online-shopping.png"
                alt="Cart"
                className="h-6 w-6"
              />
              <AvatarFallback>Carrinho</AvatarFallback>
            </Avatar>
          </span>
          Seus Pedidos
        </h2>
        <div className="divide-y divide-amber-100 mb-4">
          {/* Exemplo de item do carrinho */}
          <div className="flex items-center py-4 gap-3">
            <img
              src="/prato-exemplo.png"
              alt="Prato"
              className="w-12 h-12 rounded-lg object-cover border"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-800">
                Risoto de Cogumelos
              </div>
              <div className="text-sm text-gray-500">1x</div>
            </div>
            <div className="font-bold text-amber-700">R$ 49,90</div>
            <Button className="ml-2 bg-transparent hover:bg-amber-100 text-amber-600 hover:text-amber-800 p-2 transition-colors">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </Button>
          </div>
          <div className="flex items-center py-4 gap-3">
            <img
              src="/prato-exemplo.png"
              alt="Prato"
              className="w-12 h-12 rounded-lg object-cover border"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-800">
                Risoto de Cogumelos
              </div>
              <div className="text-sm text-gray-500">1x</div>
            </div>
            <div className="font-bold text-amber-700">R$ 49,90</div>
            <Button className="ml-2 bg-transparent hover:bg-amber-100 text-amber-600 hover:text-amber-800 p-2 rounded transition-colors">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </Button>
          </div>
          <div className="flex items-center py-4 gap-3">
            <img
              src="/prato-exemplo.png"
              alt="Prato"
              className="w-12 h-12 rounded-lg object-cover border"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-800">
                Risoto de Cogumelos
              </div>
              <div className="text-sm text-gray-500">1x</div>
            </div>
            <div className="font-bold text-amber-700">R$ 49,90</div>
            <Button className="ml-2 bg-transparent hover:bg-amber-100 text-amber-600 hover:text-amber-800 p-2 rounded transition-colors">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </Button>
          </div>
          <div className="flex items-center py-4 gap-3">
            <img
              src="/prato-exemplo.png"
              alt="Prato"
              className="w-12 h-12 rounded-lg object-cover border"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-800">
                Risoto de Cogumelos
              </div>
              <div className="text-sm text-gray-500">1x</div>
            </div>
            <div className="font-bold text-amber-700">R$ 49,90</div>
            <Button className="ml-2 bg-transparent hover:bg-amber-100 text-amber-600 hover:text-amber-800 p-2 rounded transition-colors">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </Button>
          </div>
          {/* Repita para outros itens */}
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-700">Total</span>
          <span className="text-xl font-bold text-amber-800">R$ 49,90</span>
        </div>
        <Button className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-lg transition-colors text-lg shadow">
          Finalizar Pedido
        </Button>
        <Button className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-amber-800 font-semibold py-2 rounded-lg transition-colors text-base">
          Adicionar mais
        </Button>
      </SheetContent>
    </Sheet>
  );
}
