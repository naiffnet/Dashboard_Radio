import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Clock, Calendar, Music, Radio } from "lucide-react"

export function RadioSchedule() {
  // Dados simulados para a programação
  const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]

  const scheduleData = [
    {
      id: "1",
      day: "Segunda",
      time: "06:00 - 09:00",
      program: "Manhã Animada",
      host: "Carlos Silva",
      type: "Música",
      status: "Ativo",
    },
    {
      id: "2",
      day: "Segunda",
      time: "09:00 - 12:00",
      program: "Notícias da Manhã",
      host: "Ana Oliveira",
      type: "Notícias",
      status: "Ativo",
    },
    {
      id: "3",
      day: "Segunda",
      time: "12:00 - 14:00",
      program: "Pausa para o Almoço",
      host: "Roberto Santos",
      type: "Música",
      status: "Ativo",
    },
    {
      id: "4",
      day: "Segunda",
      time: "14:00 - 17:00",
      program: "Tarde Especial",
      host: "Juliana Costa",
      type: "Variedades",
      status: "Ativo",
    },
    {
      id: "5",
      day: "Segunda",
      time: "17:00 - 19:00",
      program: "Rush Hour",
      host: "Marcos Pereira",
      type: "Música",
      status: "Ativo",
    },
    {
      id: "6",
      day: "Segunda",
      time: "19:00 - 22:00",
      program: "Noite de Flashback",
      host: "Patrícia Lima",
      type: "Música",
      status: "Ativo",
    },
    {
      id: "7",
      day: "Terça",
      time: "06:00 - 09:00",
      program: "Manhã Animada",
      host: "Carlos Silva",
      type: "Música",
      status: "Ativo",
    },
    {
      id: "8",
      day: "Terça",
      time: "09:00 - 12:00",
      program: "Notícias da Manhã",
      host: "Ana Oliveira",
      type: "Notícias",
      status: "Ativo",
    },
  ]

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-7 border-b">
          {weekDays.map((day, index) => (
            <div key={index} className="p-2 text-center font-medium border-r last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {weekDays.map((day, dayIndex) => (
            <div key={dayIndex} className="border-r last:border-r-0 min-h-[600px]">
              <ScrollArea className="h-[600px]">
                {scheduleData
                  .filter((item) => item.day === day)
                  .map((program) => (
                    <div key={program.id} className="p-2 border-b hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {program.time}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="font-medium">{program.program}</div>
                      <div className="text-sm text-muted-foreground">{program.host}</div>
                      <div className="flex items-center mt-1">
                        <Badge variant="secondary" className="mr-1 flex items-center">
                          {program.type === "Música" ? (
                            <Music className="mr-1 h-3 w-3" />
                          ) : program.type === "Notícias" ? (
                            <Radio className="mr-1 h-3 w-3" />
                          ) : (
                            <Calendar className="mr-1 h-3 w-3" />
                          )}
                          {program.type}
                        </Badge>
                        <Badge variant={program.status === "Ativo" ? "default" : "outline"}>{program.status}</Badge>
                      </div>
                    </div>
                  ))}
              </ScrollArea>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

