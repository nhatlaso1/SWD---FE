'use client';

import {
  Legend,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const data = [
  { name: 'Electronics', value: 400 },
  { name: 'Furniture', value: 300 },
  { name: 'Office Supplies', value: 300 },
  { name: 'Raw Materials', value: 200 },
  { name: 'Packaging', value: 100 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function InventorySummary() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
