import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { PlusCircle, Download } from "lucide-react"
import { AdvertisingSchedule } from "@/components/schedule/advertising-schedule"

export const metadata: Metadata = {
  title: "Inserções Publicitárias | Rádio Online",
  description: "Gerencie as inserções publicitárias da sua rádio",
}

export default function AdvertisingPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Inserções Publicitárias" text="Gerencie as inserções publicitárias da sua rádio.">
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Inserção
          </Button>
        </div>
      </DashboardHeader>

      <AdvertisingSchedule />
    </DashboardShell>
  )
}

