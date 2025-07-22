import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { CommitStats } from '../../services/github';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CommitChartProps {
  data: CommitStats[];
  className?: string;
}

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

const CommitChart: React.FC<CommitChartProps> = ({ data, className }) => {
  const chartRef = useRef<ChartJS<'line'>>(null);

  // Prepare chart data
  const chartData = {
    labels: data.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('fr-FR', { 
        month: 'short', 
        day: 'numeric' 
      });
    }),
    datasets: [
      {
        label: 'Commits',
        data: data.map(item => item.count),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context: any) => {
            const index = context[0].dataIndex;
            const date = new Date(data[index].date);
            return date.toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
          },
          label: (context: any) => {
            const count = context.parsed.y;
            return `${count} commit${count > 1 ? 's' : ''}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
          stepSize: 1,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    elements: {
      point: {
        hoverBackgroundColor: '#3b82f6',
      },
    },
  };

  // Update chart theme based on current theme
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      // You can add theme-based updates here if needed
      chart.update();
    }
  }, []);

  if (data.length === 0) {
    return (
      <ChartContainer className={className}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          color: '#6b7280',
          fontSize: '14px'
        }}>
          Aucune donnée de commit disponible
        </div>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer className={className}>
      <Line ref={chartRef} data={chartData} options={options} />
    </ChartContainer>
  );
};

export default CommitChart;