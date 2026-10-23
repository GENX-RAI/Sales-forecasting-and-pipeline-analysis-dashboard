// components/charts/RevenueForecastChart.tsx
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  month: string;
  revenue: number;
}

export default function RevenueForecastChart() {
  const { data, isLoading } = useQuery<DataPoint[]>({
    queryKey: ["revenueForecast"],
    queryFn: async () => {
      // Mock static data – in a real app we'd call an API
      return [
        { month: "Jan", revenue: 12 },
        { month: "Feb", revenue: 14 },
        { month: "Mar", revenue: 13 },
        { month: "Apr", revenue: 15 },
        { month: "May", revenue: 16 },
        { month: "Jun", revenue: 14 },
      ];
    },
  });

  if (isLoading) return <p>Loading chart…</p>;

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#10b981"
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
