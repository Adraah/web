import * as React from 'react';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';

export default function BasicComposition({ bar, line, axis }) {
  const Container = ResponsiveChartContainer;

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      {/* @ts-ignore */}
      <Container
        series={[
          {
            type: 'bar',
            data: bar,
            label: 'Tiempo muerto',
            color: '#132246',
          },
          {
            type: 'line',
            data: line,
            label: 'Tiempo deseado',
            color: 'limegreen',
          },
        ]}
        xAxis={[
          {
            data: axis,
            scaleType: 'band',
            id: 'x-axis-id',
          },
        ]}
      >
        <BarPlot />
        <LinePlot />
        <MarkPlot />
        <ChartsTooltip trigger="item" />
        <ChartsXAxis label="Herramienta" position="bottom" axisId="x-axis-id" />
      </Container>
    </Box>
  );
}
