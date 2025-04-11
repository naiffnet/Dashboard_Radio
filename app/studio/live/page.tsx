import type { Metadata } from "next"
import { StudioLive } from "@/components/studio/studio-live"

export const metadata: Metadata = {
  title: "Estúdio Ao Vivo | Rádio Online",
  description: "Transmita seu programa ao vivo com controles profissionais",
}

export default function StudioLivePage() {
  return <StudioLive />
}

