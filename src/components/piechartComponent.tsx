import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({ data }) {
  return (
    <PieChart
      series={[
        {
          data: data,
          outerRadius: "70%", // Adjust for better label positioning
          label: true, // Ensures labels are shown properly
        },
      ]}
      height={400}
      margin={{ right: 200 }}
    />
  );
}
