"use client";
import { useEffect } from 'react';

export function useDevLogs() {
  useEffect(() => {
    // Só executa no cliente (navegador)
    console.log("=" .repeat(50));
    console.log("🍽️  SaaS - Cardápio");
    console.log("=".repeat(50));
    console.log("Obrigado por testar meu código! 😁");
    console.log("Link do Repositório: https://github.com/DiegoRamos1012/SaaS-Restaurante");
    console.log("=".repeat(50));
    console.log("📅 Data/Hora:", new Date().toLocaleString("pt-BR"));
    console.log("🌐 URL:", window.location.href);
    console.log("📱 Dispositivo:", navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop');
    console.log("=" .repeat(50));
  }, []);
}