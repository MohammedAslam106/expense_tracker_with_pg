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
// import faker from 'faker';

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
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
    scales:{
        x: {
            ticks: {
              maxTicksLimit: 8,
            },
          },
        y:{
            beginAtZero:true,
            ticks:{
                maxTicksLimit: 8,
            }
        }
      },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May',];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [100,200,300,400,500,],
//       borderColor: 'rgba(255, 255, 255)',
//       backgroundColor: 'rgba(0,0,0, 0.5)',
//     },
//   ],
// };

export function LineChart({data}:any) {
  return <Line   options={options} data={data} />;
}
