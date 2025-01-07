import React from "react";
import data from '../data/chartsData.json';
import { LineChart } from '@mui/x-charts';

export default function LineChartExample() {
    return (
        <LineChart 
        //xAxis={[{ data: data.LineChart.Months }]}
        series={[
          {
            data: data.LineChart.Group1,
          },
          {
            data: data.LineChart.Group2,
          },
          {
            data: data.LineChart.Group3,
          }
        ]}
          width={600}
          height={350}
          grid={{ vertical: true, horizontal: true }}
        />
    );
}