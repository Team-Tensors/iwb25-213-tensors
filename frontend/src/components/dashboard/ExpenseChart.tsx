import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const expenseData = [
  { name: "Housing", value: 1800, color: "#8B5CF6" },
  { name: "Food & Dining", value: 650, color: "#06B6D4" },
  { name: "Transportation", value: 420, color: "#10B981" },
  { name: "Entertainment", value: 280, color: "#F59E0B" },
  { name: "Shopping", value: 380, color: "#EF4444" },
  { name: "Healthcare", value: 150, color: "#6366F1" },
  { name: "Other", value: 320, color: "#8B5A2B" },
]

export default function ExpenseChart() {
  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Monthly Expenses Breakdown</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`$${value}`, "Amount"]}
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
