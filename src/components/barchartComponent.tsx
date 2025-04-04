import * as React from "react";
import { BarChart } from '@mui/x-charts/BarChart';

export default function SimpleBarChart({ data, days }) {
  return (
    <BarChart
      series={[{ data, color: "#132246" }]}
      xAxis={[
        {
          scaleType: "band",
          data: days,
          label: "Dias",
          tickSize: 0,
          grid: { stroke: "none" },
        },
      ]}
      yAxis={[
        {
          label: "Minutos",
          tickSize: 0,
          grid: { stroke: "none" },
        },
      ]}
      height={400}
    />
  );
}
