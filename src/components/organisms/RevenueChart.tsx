import React, { memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';

interface RevenueChartProps {
  data: Array<{
    name: string;
    value: number;
    target?: number;
    previous?: number;
  }>;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#1976d2" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#1976d2"
          fillOpacity={1}
          fill="url(#colorValue)"
          name="Revenue"
        />
        <Line
          type="monotone"
          dataKey="target"
          stroke="#dc004e"
          strokeWidth={2}
          dot={false}
          name="Target"
        />
        <Line
          type="monotone"
          dataKey="previous"
          stroke="#757575"
          strokeWidth={2}
          dot={false}
          strokeDasharray="5 5"
          name="Previous"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default memo(RevenueChart);
