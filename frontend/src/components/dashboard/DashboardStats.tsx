import type React from "react"
import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
}

function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <div className="flex items-center mt-2">
            {changeType === "positive" ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : changeType === "negative" ? (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            ) : null}
            <span
              className={cn(
                "text-sm",
                changeType === "positive" && "text-green-500",
                changeType === "negative" && "text-red-500",
                changeType === "neutral" && "text-gray-500 dark:text-gray-400",
              )}
            >
              {change}
            </span>
          </div>
        </div>
        <div className="p-3 bg-gray-100 dark:bg-[#1F1F23] rounded-lg">{icon}</div>
      </div>
    </div>
  )
}

export default function DashboardStats() {
  const stats = [
    {
      title: "Monthly Income",
      value: "$8,450.00",
      change: "+12.5% from last month",
      changeType: "positive" as const,
      icon: <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />,
    },
    {
      title: "Monthly Expenses",
      value: "$5,230.80",
      change: "-3.2% from last month",
      changeType: "positive" as const,
      icon: <TrendingDown className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Net Worth",
      value: "$142,350.25",
      change: "+8.1% from last month",
      changeType: "positive" as const,
      icon: <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    },
    {
      title: "Savings Goal",
      value: "68% Complete",
      change: "Target: $50,000",
      changeType: "neutral" as const,
      icon: <PiggyBank className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
