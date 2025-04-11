import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PlusCircle, Download, Calendar, Radio, Clock, Filter } from "lucide-react"
import { RadioSchedule } from "@/components/schedule/radio-schedule"
import { AdvertisingSchedule } from "@/components/schedule/advertising-schedule"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Agenda Detalhada | Rádio Online",
  description: "Gerencie a programação e inserções da sua rádio com detalhes",
}

export default function AgendaDetailPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Agenda Detalhada" text="Visualize e gerencie sua programação com detalhes avançados.">
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Agenda
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Programa
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              Programas Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">
              <span className="text-green-500">+2</span> desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              Horas Programadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">168</div>
            <p className="text-sm text-muted-foreground">Programação completa para a semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Radio className="mr-2 h-4 w-4 text-muted-foreground" />
              Inserções Publicitárias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-sm text-muted-foreground">
              <span className="text-green-500">+8</span> desde o mês passado
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">Visão Semanal</h2>
          <Badge variant="outline">Semana atual</Badge>
        </div>

        <div className="flex items-center space-x-2">
          <Select defaultValue="week">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Hoje</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="programs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="programs">
            <Calendar className="mr-2 h-4 w-4" />
            Programação
          </TabsTrigger>
          <TabsTrigger value="advertising">
            <Radio className="mr-2 h-4 w-4" />
            Inserções Publicitárias
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <TabsContent value="programs" className="m-0">
            <RadioSchedule />
          </TabsContent>
          <TabsContent value="advertising" className="m-0">
            <AdvertisingSchedule />
          </TabsContent>
        </div>
      </Tabs>
    </DashboardShell>
  )
}

