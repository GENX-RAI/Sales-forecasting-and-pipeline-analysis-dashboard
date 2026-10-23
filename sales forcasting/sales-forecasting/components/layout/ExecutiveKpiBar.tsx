// components/layout/ExecutiveKpiBar.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const kpis = [
  {
    label: "Forecast Revenue",
    value: "$14.2M",
    change: "+$800k",
    color: "positive",
  },
  {
    label: "Avg Win Propensity",
    value: "68.4%",
    change: "+2.1%",
    color: "positive",
  },
  {
    label: "Deal Cycle Velocity",
    value: "34 days",
    change: "-3 days",
    color: "negative",
  },
  {
    label: "FTE Capacity Utilization",
    value: "85%",
    change: "+5%",
    color: "positive",
  },
];

export default function ExecutiveKpiBar() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {kpis.map((kpi) => (
        <motion.div key={kpi.label} whileHover={{ scale: 1.03 }}>
          <Card className="bg-card border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400">{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white">{kpi.value}</div>
              <div
                className={`text-sm mt-1 ${kpi.color === "positive" ? "text-positive" : "text-negative"}`}
              >
                {kpi.change}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
