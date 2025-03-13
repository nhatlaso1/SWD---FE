'use client';

// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis
// } from '@/components/ui/cha';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const data = [
  {
    name: 'Jan 1',
    inventory: 4000,
    operations: 2400
  },
  {
    name: 'Jan 5',
    inventory: 3000,
    operations: 1398
  },
  {
    name: 'Jan 10',
    inventory: 2000,
    operations: 9800
  },
  {
    name: 'Jan 15',
    inventory: 2780,
    operations: 3908
  },
  {
    name: 'Jan 20',
    inventory: 1890,
    operations: 4800
  },
  {
    name: 'Jan 25',
    inventory: 2390,
    operations: 3800
  },
  {
    name: 'Jan 30',
    inventory: 3490,
    operations: 4300
  }
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="inventory" fill="#8884d8" name="Inventory Level" />
        <Bar dataKey="operations" fill="#82ca9d" name="Operations Cost" />
      </BarChart>
    </ResponsiveContainer>
  );
}
