"use client";

import { PieChart } from "@/components/ui/chart";

export function ProgramPieChart() {
  const formatTooltipLabel = (context: any) => {
    const dataset = context.dataset;
    const total = dataset.data.reduce((acc: number, data: number) => acc + data, 0);
    const value = dataset.data[context.dataIndex];
    const percentage = ((value / total) * 100).toFixed(1);
    return `${context.label}: ${percentage}%`;
  };

  return (
    <PieChart
      data={{
        labels: ["Manhã Animada", "Tarde Especial", "Noite de Flashback", "Jazz & Blues", "Outros"],
        datasets: [
          {
            data: [32, 25, 18, 15, 10],
            backgroundColor: [
              "hsl(var(--primary))",
              "hsl(var(--primary) / 0.8)",
              "hsl(var(--primary) / 0.6)",
              "hsl(var(--primary) / 0.4)",
              "hsl(var(--primary) / 0.2)",
            ],
            borderWidth: 1,
            borderColor: "hsl(var(--background))",
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: formatTooltipLabel
            }
          },
        },
      }}
    />
  );
}