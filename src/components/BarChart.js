import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ label, title, bg, chartData }) => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: `${new Date().toLocaleString('default', { month: 'long' })} ${title}`,
      },
    },
  };

  let labels = [];

  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    labels.push(i);
  }


  const data = {
    labels,
    datasets: [
      {
        label: `${label}`,
        data: [],
        backgroundColor: `${bg}`,
      }
    ],
  };

  return (
    <Bar style={{ border: '1px solid lightgrey' }} className='bg-white p-2' options={options} data={data} />
  );
};

export default BarChart;