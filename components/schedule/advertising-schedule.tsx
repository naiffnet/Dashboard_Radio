import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Clock, DollarSign, Building, Tag } from "lucide-react"

export function AdvertisingSchedule() {
  // Dados simulados para inserções publicitárias
  const advertisingData = [
    {
      id: "1",
      time: "07:15",
      client: "Supermercado Economia",
      campaign: "Ofertas da Semana",
      duration: "30 seg",
      days: ["Segunda", "Quarta", "Sexta"],
      status: "Ativo",
      value: "R$ 450,00",
    },
    {
      id: "2",
      time: "08:30",
      client: "Loja Fashion",
      campaign: "Coleção Verão",
      duration: "20 seg",
      days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
      status: "Ativo",
      value: "R$ 600,00",
    },
    {
      id: "3",
      time: "10:45",
      client: "Academia Fitness",
      campaign: "Promoção Anual",
      duration: "45 seg",
      days: ["Segunda", "Quarta", "Sexta"],
      status: "Ativo",
      value: "R$ 520,00",
    },
    {
      id: "4",
      time: "12:15",
      client: "Restaurante Sabor",
      campaign: "Delivery Grátis",
      duration: "30 seg",
      days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
      status: "Ativo",
      value: "R$ 750,00",
    },
    {
      id: "5",
      time: "15:30",
      client: "Auto Center",
      campaign: "Revisão Completa",
      duration: "20 seg",
      days: ["Segunda", "Quarta", "Sexta"],
      status: "Ativo",
      value: "R$ 380,00",
    },
    {
      id: "6",
      time: "17:45",
      client: "Farmácia Saúde",
      campaign: "Descontos Especiais",
      duration: "30 seg",
      days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      status: "Ativo",
      value: "R$ 620,00",
    },
    {
      id: "7",
      time: "19:15",
      client: "Cinema Estrela",
      campaign: "Lançamentos da Semana",
      duration: "45 seg",
      days: ["Quinta", "Sexta", "Sábado", "Domingo"],
      status: "Ativo",
      value: "R$ 580,00",
    },
    {
      id: "8",
      time: "21:30",
      client: "Pizzaria Delícia",
      campaign: "Combo Família",
      duration: "20 seg",
      days: ["Sexta", "Sábado", "Domingo"],
      status: "Ativo",
      value: "R$ 420,00",
    },
  ]

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-[120px_1fr_150px_150px_120px_100px] font-medium p-2 bg-muted rounded-md mb-2">
          <div>Horário</div>
          <div>Cliente/Campanha</div>
          <div>Duração</div>
          <div>Dias</div>
          <div>Valor</div>
          <div>Ações</div>
        </div>

        <ScrollArea className="h-[600px]">
          {advertisingData.map((ad) => (
            <div
              key={ad.id}
              className="grid grid-cols-[120px_1fr_150px_150px_120px_100px] p-3 border-b hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center">
                <Badge variant="outline" className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {ad.time}
                </Badge>
              </div>

              <div>
                <div className="font-medium flex items-center">
                  <Building className="mr-1 h-4 w-4 text-muted-foreground" />
                  {ad.client}
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Tag className="mr-1 h-3 w-3" />
                  {ad.campaign}
                </div>
              </div>

              <div className="flex items-center">{ad.duration}</div>

              <div className="flex flex-wrap gap-1">
                {ad.days.map((day, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {day.substring(0, 3)}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center font-medium text-green-600">
                <DollarSign className="h-4 w-4 mr-1" />
                {ad.value}
              </div>

              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

