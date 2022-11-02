import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Danies's Blood Pressure Records Max/Min",
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ['12-10-2022', '01-03-2023', '04-06-2023', '11-07-2023', '17-08-2023', '11-10-2023', '12-01-2022'];
const pressureUpper = [110, 125, 106, 127, 110, 109, 116];
const pressureLower = [80, 85, 76, 83, 85, 82, 80];


export const data = {
  labels,
  datasets: [
    {
      label: 'Blood Pressure UpperBound',
      data: labels.map((val, i) => pressureUpper[i]),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Blood Pressure LowerBound',
      data: labels.map((val, i) => pressureLower[i]),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y1',
    },
  ],
};

export function App() {
  return <Line options={options} data={data} />;
}


export default function BloodPressureChart() {
  return (
    <Line options={options} data={data} />
  )
}
