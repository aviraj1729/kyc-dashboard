'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

export default function BarChart({ data, isDarkMode }) {
  const chartData = {
    labels: ['Today', 'Yesterday'],
    datasets: [
      {
        label: 'Individual',
        data: [data?.individual?.today || 0, data?.individual?.yesterday || 0],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Non-Individual',
        data: [data?.nonIndividual?.today || 0, data?.nonIndividual?.yesterday || 0],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#E5E7EB' : '#374151',
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Individual vs Non-Individual KYC',
        color: isDarkMode ? '#F3F4F6' : '#1F2937',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDarkMode ? '#F3F4F6' : '#1F2937',
        bodyColor: isDarkMode ? '#E5E7EB' : '#374151',
        borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: isDarkMode ? '#374151' : '#F3F4F6',
        },
        ticks: {
          color: isDarkMode ? '#E5E7EB' : '#374151',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: isDarkMode ? '#374151' : '#F3F4F6',
        },
        ticks: {
          color: isDarkMode ? '#E5E7EB' : '#374151',
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}