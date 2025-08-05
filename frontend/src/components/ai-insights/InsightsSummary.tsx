import { TrendingUp, AlertTriangle, Target, DollarSign } from "lucide-react"

interface Insight {
  id: string
  type: "recommendation" | "warning" | "goal" | "trend"
  title: string
  description: string
  priority: "high" | "medium" | "low"
  category: "spending" | "saving" | "investment" | "debt" | "budgeting"
  impact: number // Impact score 1-10
  actionRequired: boolean
  createdAt: string
}

interface InsightsSummaryProps {
  insights: Insight[]
}

export default function InsightsSummary({ insights }: InsightsSummaryProps) {
  const highPriorityInsights = insights.filter(insight => insight.priority === "high")
  const actionRequiredInsights = insights.filter(insight => insight.actionRequired)
  const averageImpact = insights.length > 0 
    ? insights.reduce((sum, insight) => sum + insight.impact, 0) / insights.length
    : 0
  const totalInsights = insights.length

  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case "recommendation":
        return <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
      case "goal":
        return <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
      case "trend":
        return <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
      default:
        return <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Insights</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalInsights}
            </p>
          </div>
          <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Priority</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {highPriorityInsights.length}
            </p>
          </div>
          <div className="h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Action Required</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {actionRequiredInsights.length}
            </p>
          </div>
          <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
            <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Impact Score</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {averageImpact.toFixed(1)}/10
            </p>
          </div>
          <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
