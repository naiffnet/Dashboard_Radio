"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Impede que o navegador mostre o prompt padrão
      e.preventDefault();
      // Armazena o evento para que possa ser acionado mais tarde
      setDeferredPrompt(e);
      // Mostra nosso prompt personalizado
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    // Mostra o prompt de instalação
    deferredPrompt.prompt();

    // Espera pelo resultado
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou a instalação do PWA');
      } else {
        console.log('Usuário recusou a instalação do PWA');
      }
      // Limpa o prompt salvo, ele só pode ser usado uma vez
      setDeferredPrompt(null);
      setShowPrompt(false);
    });
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg z-50 flex justify-between items-center">
      <div>
        <h3 className="font-bold">Instale o RadioHub</h3>
        <p className="text-sm">Instale nosso app para acesso rápido e offline</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={dismissPrompt}>
          <X className="h-4 w-4 mr-1" /> Não agora
        </Button>
        <Button size="sm" onClick={handleInstallClick}>
          Instalar
        </Button>
      </div>
    </div>
  );
}

