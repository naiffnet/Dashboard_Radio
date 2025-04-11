import { useEffect } from 'react';

export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.error('Erro ao registrar Service Worker:', error);
        });
    });
  }
}

export function usePWA() {
  useEffect(() => {
    registerServiceWorker();

    // Adiciona evento para atualização do Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('controllerchange', () => {
          window.location.reload();
        });
      });
    }

    // Adiciona evento para instalação do PWA
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      // Armazena o evento para usar mais tarde
      (window as any).deferredPrompt = e;
    });
  }, []);
}