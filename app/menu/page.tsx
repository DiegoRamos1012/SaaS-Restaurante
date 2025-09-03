import Link from "next/link";

export default function MenuPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Página de exemplo — /menu</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Esta é uma página nova criada em app/menu/page.tsx. Você pode editar
        esse arquivo para construir sua página.
      </p>
      <Link
        prefetch
        href="/"
        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:opacity-90"
      >
        Voltar para a home
      </Link>
    </div>
  );
}
