import Link from "next/link";
import { mockMenuItems } from "@/data/mockedData";

export default function Menu() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Cabeçalho */}
      <header className="py-6 px-4 bg-amber-800 text-white sticky top-0 z-10 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Le Gourmet</h1>
              <p className="text-amber-200 italic">Culinária Contemporânea</p>
            </div>
            <nav className="hidden md:flex space-x-4">
              {mockMenuItems.map((section, index) => (
                <a 
                  key={index} 
                  href={`#${section.category}`}
                  className="hover:text-amber-200 transition-colors"
                >
                  {section.category}
                </a>
              ))}
            </nav>
            <Link 
              href="/"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
            >
              Voltar
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto py-8 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-amber-900">Nosso Cardápio</h2>
        
        {/* Seções do cardápio */}
        {mockMenuItems.map((section, index) => (
          <div key={index} className="mb-16" id={section.category}>
            <h3 className="text-2xl font-semibold mb-6 pb-2 border-b-2 border-amber-300 text-amber-800">
              {section.category}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`h-40 ${item.color} flex items-center justify-center relative`}>
                    <span className="text-6xl">{item.emoji}</span>
                    
                    {item.popular && (
                      <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xl font-medium text-gray-800">{item.name}</h4>
                      <span className="font-bold text-amber-700">{item.price}</span>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
                    
                    {item.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Rodapé */}
      <footer className="bg-amber-800 text-amber-100 py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="mb-2">Le Gourmet - Culinária Contemporânea</p>
          <p className="text-sm">Aberto de Terça a Domingo, das 18h às 23h</p>
          <p className="text-sm mt-4">Rua das Delícias, 123 - Centro</p>
          <p className="text-sm">Reservas: (11) 91234-5678</p>
          
          <div className="mt-6 flex justify-center space-x-4">
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
