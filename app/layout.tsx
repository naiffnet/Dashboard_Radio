import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { OfflineIndicator } from "@/components/offline-indicator"
// Removendo componentes que podem causar problemas no web view
// import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
// import { PushNotificationManager } from "@/components/push-notification-manager"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rádio Online - Transmita de Qualquer Lugar",
  description: "Plataforma completa para locutores de rádio online",
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RadioHub",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-icon-180x180.png", sizes: "180x180", type: "image/png" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="RadioHub" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="RadioHub" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180x180.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registrado com sucesso:', registration.scope);
                    },
                    function(err) {
                      console.log('Falha ao registrar Service Worker:', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem themes={["light", "dark", "colorful"]}>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
            <OfflineIndicator />
            {/* Removendo componentes PWA que podem não funcionar bem no web view */}
            {/* <PWAInstallPrompt /> */}
            {/* <PushNotificationManager /> */}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}