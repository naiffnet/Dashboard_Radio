import type { Metadata } from "next"
import OfflineManagerPageClient from "./offline-manager-page-client"

export const metadata: Metadata = {
  title: "Gerenciador Offline | Rádio Online",
  description: "Gerencie recursos para uso offline na sua estação de rádio",
}

export default function OfflineManagerPage() {
  return <OfflineManagerPageClient />
}

