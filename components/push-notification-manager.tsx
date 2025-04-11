"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function PushNotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission | "default">("default");
  const { toast } = useToast();

  useEffect(() => {
    if (!("Notification" in window)) {
      return;
    }

    setPermission(Notification.permission);
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      toast({
        title: "Erro",
        description: "Este navegador não suporta notificações push",
        variant: "destructive",
      });
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission === "granted") {
        toast({
          title: "Sucesso",
          description: "Notificações ativadas com sucesso!",
        });

        // Registrar para receber notificações push
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          const registration = await navigator.serviceWorker.ready;
          
          // Aqui você implementaria a lógica para enviar o endpoint para seu servidor
          // const subscription = await registration.pushManager.subscribe({
          //   userVisibleOnly: true,
          //   applicationServerKey: urlBase64ToUint8Array('SUA_CHAVE_PUBLICA_VAPID')
          // });
          
          // console.log('Endpoint:', JSON.stringify(subscription));
          // Enviar subscription para seu backend
        }
      } else {
        toast({
          title: "Aviso",
          description: "Você precisa permitir notificações para receber atualizações",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Erro ao solicitar permissão:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao solicitar permissão para notificações",
        variant: "destructive",
      });
    }
  };

  if (permission === "granted") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={requestPermission} size="sm" className="rounded-full p-3">
        <Bell className="h-5 w-5" />
      </Button>
    </div>
  );
}

// Função auxiliar para converter a chave VAPID para o formato correto
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}