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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: `${new Date().toLocaleString('default', { month: 'long' })} Water Consumed`,
    },
  },
};

let labels = [];

const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
for (let i = 1; i <= daysInMonth; i++) {
  labels.push(i);
}


export const data = {
  labels,
  datasets: [
    {
      label: 'Glass of Water',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

const BarChart = ({waterData}) => {

  return (
    <Bar style={{ border: '1px solid lightgrey' }} className='bg-white p-2' options={options} data={data} />
  );
};

export default BarChart;