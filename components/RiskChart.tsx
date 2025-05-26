
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import type { ContributingFactor } from '../types';

interface RiskChartProps {
  factors: ContributingFactor[];
}

const factorColors = [
  '#0ea5e9', // sky-500
  '#06b6d4', // cyan-500
  '#14b8a6', // teal-500
  '#22c55e', // green-500
  '#84cc16', // lime-500
];

export const RiskChart: React.FC<RiskChartProps> = ({ factors }) => {
  if (!factors || factors.length === 0) {
    return <p className="text-slate-400 text-center py-4">No factor data to display.</p>;
  }

  const chartData = factors.map(factor => ({
    name: factor.name,
    impact: factor.impactScore,
    description: factor.description,
  }));

  return (
    <div className="w-full h-80 md:h-96 bg-slate-700/50 p-4 rounded-lg shadow-inner">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis type="number" stroke="#94a3b8" />
          <YAxis 
            dataKey="name" 
            type="category" 
            stroke="#94a3b8" 
            width={150} 
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <Tooltip
            cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', color: '#e2e8f0' }}
            formatter={(value: number, name: string, props: any) => [`${value} (Impact Score)`, props.payload.description]}
            labelFormatter={(label: string) => <span style={{ color: '#cbd5e1', fontWeight: 'bold' }}>{label}</span>}
          />
          <Legend wrapperStyle={{ color: '#cbd5e1' }} />
          <Bar dataKey="impact" name="Impact Score" barSize={20}>
            {
              chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={factorColors[index % factorColors.length]} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
