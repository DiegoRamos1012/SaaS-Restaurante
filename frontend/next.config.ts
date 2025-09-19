import type { NextConfig } from "next";

// Logs de inicialização do sistema que é executada no terminal
console.log("=".repeat(50));
console.log("🍽️  SaaS - Restaurante")
console.log("Obrigado por testar meu código! 😁")
console.log("Link do Repositório: https://github.com/DiegoRamos1012/SaaS-Restaurante")
console.log("=".repeat(50));
console.log("📅 Data/Hora:", new Date().toLocaleString("pt-BR"));
console.log("🌍 Ambiente:", process.env.NODE_ENV);
console.log("🔧 Versão Node:", process.version);
console.log("⚡ Versão do Next.js:", require("next/package.json").version);
console.log(
  "🔗 API Backend:",
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
);
console.log("💻 Platform:", process.platform);
console.log("=" .repeat(50));

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
