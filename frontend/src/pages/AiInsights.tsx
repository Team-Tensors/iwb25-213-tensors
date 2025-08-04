import { useState } from "react"
import { TrendingUp, PieChart, BarChart3, Target, AlertTriangle, CheckCircle, DollarSign } from "lucide-react"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts"

export default function AIInsights() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")

  // Sample data for insights
  const spendingByCategory = [
    { name: "Housing", value: 1800, color: "#8B5CF6", percentage: 34.4 },
    { name: "Food & Dining", value: 650, color: "#06B6D4", percentage: 12.4 },
    { name: "Transportation", value: 420, color: "#10B981", percentage: 8.0 },
    { name: "Entertainment", value: 280, color: "#F59E0B", percentage: 5.4 },
    { name: "Shopping", value: 380, color: "#EF4444", percentage: 7.3 },
    { name: "Other", value: 700, color: "#6B7280", percentage: 13.4 },
  ]

  const monthlyTrends = [
    { month: "Jul", income: 8200, expenses: 5100, savings: 3100 },
    { month: "Aug", income: 8350, expenses: 5300, savings: 3050 },
    { month: "Sep", income: 8100, expenses: 5450, savings: 2650 },
    { month: "Oct", income: 8500, expenses: 5200, savings: 3300 },
    { month: "Nov", income: 8300, expenses: 5350, savings: 2950 },
    { month: "Dec", income: 8450, expenses: 5230, savings: 3220 },
  ]

  const budgetRecommendations = [
    {
      category: "Food & Dining",
      current: 650,
      recommended: 500,
      savings: 150,
      priority: "high",
      reason: "Spending 23% above recommended budget for your income level",
    },
    {
      category: "Entertainment",
      current: 280,
      recommended: 200,
      savings: 80,
      priority: "medium",
      reason: "Consider reducing streaming subscriptions and dining out",
    },
    {
      category: "Shopping",
      current: 380,
      recommended: 250,
      savings: 130,
      priority: "medium",
      reason: "Impulse purchases detected - try the 24-hour rule",
    },
  ]

  const savingsGoals = [
    {
      name: "Emergency Fund",
      target: 50000,
      current: 34000,
      monthlyContribution: 1200,
      estimatedCompletion: "5 months",
      onTrack: true,
    },
    {
      name: "Vacation Fund",
      target: 5000,
      current: 1800,
      monthlyContribution: 300,
      estimatedCompletion: "11 months",
      onTrack: false,
    },
    {
      name: "Home Down Payment",
      target: 80000,
      current: 25000,
      monthlyContribution: 2000,
      estimatedCompletion: "28 months",
      onTrack: true,
    },
  ]

  const aiInsights = [
    {
      type: "positive",
      title: "Great Savings Rate!",
      description: "You're saving 38% of your income, which is excellent. The recommended rate is 20%.",
      action: "Consider investing excess savings for better returns.",
    },
    {
      type: "warning",
      title: "Food Spending Alert",
      description: "Your food expenses increased 15% this month compared to your 6-month average.",
      action: "Try meal planning and cooking at home more often.",
    },
    {
      type: "opportunity",
      title: "Investment Opportunity",
      description: "You have $5,000+ sitting in low-yield savings. Consider diversifying.",
      action: "Explore index funds or high-yield savings accounts.",
    },
    {
      type: "positive",
      title: "Debt Progress",
      description: "You've paid off 23% of your total debt this year. Keep up the momentum!",
      action: "Consider the debt avalanche method for faster payoff.",
    },
  ]

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "opportunity":
        return <Target className="w-5 h-5 text-blue-600" />
      default:
        return <DollarSign className="w-5 h-5 text-gray-600" />
    }
  }

  const getInsightBgColor = (type: string) => {
    switch (type) {
      case "positive":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      case "opportunity":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      default:
        return "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800"
    }
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Insights</h1>
            <p className="text-gray-600 dark:text-gray-400">Personalized financial insights and recommendations</p>
          </div>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-[#1F1F23] rounded-lg bg-white dark:bg-[#0F0F12] text-gray-900 dark:text-white"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* AI Insights Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {aiInsights.map((insight, index) => (
            <div key={index} className={`rounded-xl p-6 border ${getInsightBgColor(insight.type)}`}>
              <div className="flex items-start space-x-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{insight.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{insight.description}</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{insight.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Spending Breakdown */}
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Spending Analysis
            </h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={spendingByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {spendingByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {spendingByCategory.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <span className="text-gray-900 dark:text-white">{category.name}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{category.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Trends
            </h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                  <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} name="Income" />
                  <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} name="Expenses" />
                  <Line type="monotone" dataKey="savings" stroke="#06B6D4" strokeWidth={2} name="Savings" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Budget Recommendations */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Budget Recommendations
          </h3>
          <div className="space-y-4">
            {budgetRecommendations.map((rec, index) => (
              <div key={index} className="border border-gray-200 dark:border-[#1F1F23] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{rec.category}</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rec.priority === "high"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {rec.priority} priority
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current</p>
                    <p className="font-medium text-gray-900 dark:text-white">${rec.current}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Recommended</p>
                    <p className="font-medium text-green-600 dark:text-green-400">${rec.recommended}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Potential Savings</p>
                    <p className="font-medium text-blue-600 dark:text-blue-400">${rec.savings}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{rec.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Goals Progress */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Savings Goals Progress
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savingsGoals.map((goal, index) => {
              const progressPercentage = ((goal.current / goal.target) * 100).toFixed(1)
              return (
                <div key={index} className="border border-gray-200 dark:border-[#1F1F23] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{goal.name}</h4>
                    {goal.onTrack ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-white">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min(Number.parseFloat(progressPercentage), 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Current</p>
                        <p className="font-medium text-gray-900 dark:text-white">${goal.current.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Target</p>
                        <p className="font-medium text-gray-900 dark:text-white">${goal.target.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600 dark:text-gray-400">Monthly: ${goal.monthlyContribution}</p>
                      <p className="text-gray-600 dark:text-gray-400">ETA: {goal.estimatedCompletion}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
  )
}
