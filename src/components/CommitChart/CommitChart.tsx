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
import { cn } from '../../utils/cn';
import { CommitStats } from '../../services/github';

// Register Chart.js components
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler
);

interface CommitChartProps {
  data: CommitStats[];
  className?: string;
}

// Lit une variable CSS « canaux RGB » (ex. "12 12 12") et renvoie ses composantes
// separees par des virgules, pretes pour rgb()/rgba(). Permet de garder le
// graphique MONOCHROME et synchronise avec le theme clair/sombre.
const cssChannels = (name: string, fallback: string): string => {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return (v || fallback).split(/\s+/).join(', ');
};

const CommitChart: React.FC<CommitChartProps> = ({ data, className }) => {
  const chartRef = useRef<ChartJS<'line'>>(null);

  // Palette derivee du theme (encre / papier / texte secondaire).
  const ink = cssChannels('--ink', '12, 12, 12');
  const base = cssChannels('--base', '255, 255, 255');
  const muted = cssChannels('--muted', '92, 92, 92');

  const chartData = {
    labels: data.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Commits',
        data: data.map(item => item.count),
        borderColor: `rgb(${ink})`,
        backgroundColor: `rgba(${ink}, 0.08)`,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: `rgb(${ink})`,
        pointBorderColor: `rgb(${base})`,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: `rgb(${ink})`,
        titleColor: `rgb(${base})`,
        bodyColor: `rgb(${base})`,
        borderColor: `rgb(${ink})`,
        borderWidth: 1,
        cornerRadius: 0,
        displayColors: false,
        callbacks: {
          title: (context: any) => {
            const index = context[0].dataIndex;
            const date = new Date(data[index].date);
            return date.toLocaleDateString('fr-FR', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
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
        grid: { display: false },
        ticks: { color: `rgb(${muted})`, font: { size: 12 }, maxTicksLimit: 10 },
      },
      y: {
        beginAtZero: true,
        grid: { color: `rgba(${muted}, 0.18)` },
        ticks: { color: `rgb(${muted})`, font: { size: 12 }, stepSize: 1 },
      },
    },
    interaction: { intersect: false, mode: 'index' as const },
    elements: { point: { hoverBackgroundColor: `rgb(${ink})` } },
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, []);

  if (data.length === 0) {
    return (
      <div className={cn('w-full h-[400px] relative', className)}>
        <div className="flex items-center justify-center h-full text-sm text-muted">
          Aucune donnée de commit disponible
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full h-[400px] relative', className)}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default CommitChart;
