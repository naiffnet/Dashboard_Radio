import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Análise de Audiência | Rádio Online",
  description: "Estatísticas detalhadas sobre sua audiência",
}

export default function AudienceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}