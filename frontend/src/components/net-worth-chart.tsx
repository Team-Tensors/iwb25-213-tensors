import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const netWorthData = [
  { month: "Jan", netWorth: 125000 },
  { month: "Feb", netWorth: 128500 },
  { month: "Mar", netWorth: 132000 },
  { month: "Apr", netWorth: 129800 },
  { month: "May", netWorth: 135200 },
  { month: "Jun", netWorth: 138900 },
  { month: "Jul", netWorth: 142350 },
]

export default function NetWorthChart() {
  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Net Worth Trend</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={netWorthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, "Net Worth"]}
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="netWorth"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#8B5CF6", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
