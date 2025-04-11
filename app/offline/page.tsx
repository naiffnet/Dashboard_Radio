"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Radio, WifiOff, Home } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <WifiOff className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">Você está offline</CardTitle>
          <CardDescription>Parece que você está sem conexão com a internet no momento.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <Radio className="h-12 w-12 text-primary" />
            <p className="text-sm text-muted-foreground">
              O RadioHub precisa de uma conexão para funcionar completamente, mas algumas funcionalidades estão
              disponíveis offline.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Voltar para o Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

