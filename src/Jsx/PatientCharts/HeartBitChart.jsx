import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
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
    Filler,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Daniel's HeartRate Record Per Minute",
      },
    },
  };

  const labels = ['12-10-2022', '01-03-2023', '04-06-2023', '11-07-2023', '17-08-2023', '11-10-2023', '12-01-2022'];
  const heartBit = [60, 65, 66, 63, 75, 82, 60];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "HeartRate/min",
      data: labels.map((val, i) => heartBit[i] ),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function HeartBitChart() {
  return (
    <Line options={options} data={data} />
  )
}
