import Link from "next/link";
import { mockMenuItems } from "@/data/mockedData";
import { formatCurrency } from "@/utils/format";
import React from "react";

export default function Menu() {
  // Agrupamento direto por categoria
  const categoryMap: Record<string, typeof mockMenuItems> = {};
  mockMenuItems.forEach((item) => {
    item.categories.forEach((cat) => {
      if (!categoryMap[cat]) categoryMap[cat] = [];
      categoryMap[cat].push(item);
    });
  });
  const sections = Object.entries(categoryMap);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <header className="py-3 px-4 bg-amber-800 text-white sticky top-0 z-10 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">Le Gourmet</h1>
              <p className="text-amber-200 italic">Culinária Contemporânea</p>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-start space-x-2 md:space-x-4 mt-4 md:mt-0">
              {sections.map(([category], idx) => (
                <React.Fragment key={category}>
                  <a
                    href={`#${category}`}
                    className="hover:text-amber-200 transition-colors text-sm md:text-base"
                  >
                    {category}
                  </a>
                  {idx < sections.length - 1 && (
                    <span className="text-amber-300 mx-0.5">·</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
            <Link
              href="/"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full transition-colors mt-4 md:mt-0"
            >
              Voltar
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-2 sm:px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-amber-900">
          Nosso Cardápio
        </h2>
        {sections.map(([category, items]) => (
          <section key={category} className="mb-16" id={category}>
            <h3 className="text-2xl font-semibold mb-6 pb-2 border-b-2 border-amber-300 text-amber-800">
              {category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                >
                  <div className="h-40 bg-amber-100 flex items-center justify-center relative" />
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xl font-medium text-gray-800">
                        {item.name}
                      </h4>
                      <span className="font-bold text-amber-700">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="bg-amber-800 text-amber-100 py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="mb-2">Le Gourmet - Culinária Contemporânea</p>
          <p className="text-sm">Aberto de Terça a Domingo, das 18h às 23h</p>
          <p className="text-sm mt-4">Rua das Delícias, 123 - Centro</p>
          <p className="text-sm">Reservas: (11) 91234-5678</p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
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
