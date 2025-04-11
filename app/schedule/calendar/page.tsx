import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Calendário | Rádio Online",
  description: "Visualize sua programação em formato de calendário",
}

export default function CalendarPage() {
  // Dados simulados para o calendário
  const currentMonth = "Março 2025"
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  // Simulação de dias do mês (1 a 31)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)

  // Simulação de eventos
  const events = [
    { day: 5, title: "Especial Rock", type: "program", time: "20:00" },
    { day: 8, title: "Entrevista Exclusiva", type: "special", time: "15:30" },
    { day: 12, title: "Campanha Supermercado", type: "ad", time: "Várias" },
    { day: 15, title: "Aniversário da Rádio", type: "special", time: "Todo o dia" },
    { day: 18, title: "Promoção Ouvintes", type: "promo", time: "12:00" },
    { day: 22, title: "Festival de Música", type: "special", type: "promo", time: "12:00" },
    { day: 22, title: "Festival de Música", type: "special", time: "19:00" },
    { day: 25, title: "Debate Político", type: "program", time: "10:00" },
    { day: 28, title: "Lançamento de Álbum", type: "special", time: "16:00" },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Calendário" text="Visualize sua programação em formato de calendário.">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </DashboardHeader>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold">{currentMonth}</h2>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-center font-medium text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Offset para começar no dia correto da semana (exemplo: começa na quarta-feira) */}
            {Array.from({ length: 2 }, (_, i) => (
              <div key={`empty-${i}`} className="h-24 p-1 border rounded-md bg-muted/20"></div>
            ))}

            {daysInMonth.map((day) => {
              const dayEvents = events.filter((event) => event.day === day)

              return (
                <div
                  key={day}
                  className={`h-24 p-1 border rounded-md hover:bg-muted/50 transition-colors ${
                    day === 15 ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium ${day === 15 ? "text-primary" : ""}`}>{day}</span>
                    {day === new Date().getDate() && (
                      <Badge variant="default" className="text-[10px]">
                        Hoje
                      </Badge>
                    )}
                  </div>

                  <div className="mt-1 space-y-1">
                    {dayEvents.map((event, index) => (
                      <div
                        key={index}
                        className={`text-[10px] p-1 rounded truncate ${
                          event.type === "program"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : event.type === "special"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                              : event.type === "ad"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                        }`}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div>{event.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

