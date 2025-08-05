import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface AnalyticsChartsProps {
  spendingTrends: Array<{
    month: string;
    spending: number;
    income: number;
    savings: number;
  }>;
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

const COLORS = [
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#8B5CF6", // Purple
  "#F97316", // Orange
  "#06B6D4", // Cyan
  "#84CC16", // Lime
];

export default function AnalyticsCharts({ spendingTrends, categoryBreakdown }: AnalyticsChartsProps) {
  const [activeChart, setActiveChart] = useState<"trends" | "categories">("trends");

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
          {payload.map((pld: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 mt-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: pld.color }}
              ></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {pld.dataKey}: ${pld.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{data.category}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ${data.amount.toLocaleString()} ({data.percentage.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Spending Trends Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Financial Trends</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveChart("trends")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeChart === "trends"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              Trends
            </button>
            <button
              onClick={() => setActiveChart("categories")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeChart === "categories"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              Categories
            </button>
          </div>
        </div>

        {activeChart === "trends" ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="income" fill="#10B981" name="Income" radius={[2, 2, 0, 0]} />
                <Bar dataKey="spending" fill="#EF4444" name="Spending" radius={[2, 2, 0, 0]} />
                <Bar dataKey="savings" fill="#3B82F6" name="Savings" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="amount"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeChart === "categories" && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {categoryBreakdown.map((item, index) => (
              <div key={item.category} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
                  {item.category} ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Financial Health Score */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Financial Health Analysis</h3>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Savings Rate</span>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">28%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "28%" }}></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Excellent! Above recommended 20%</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Debt-to-Income</span>
              <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">15%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "15%" }}></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Good. Keep below 20%</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Emergency Fund</span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">4.2 months</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Good progress. Target: 6 months</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Investment Diversity</span>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">82%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }}></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Well diversified portfolio</p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Overall Health Score</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">8.5/10</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Excellent financial health! Keep up the good work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
