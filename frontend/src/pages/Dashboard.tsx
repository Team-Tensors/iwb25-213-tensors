import { TrendingUp, PieChart, MessageSquare } from "lucide-react"
import DashboardStats from "../components/dashboard-stats"
import ExpenseChart from "../components/expense-chart"
import NetWorthChart from "../components/net-worth-chart"
import List01 from "../components/list-01"
import List02 from "../components/list-02"
import List03 from "../components/list-03"

export default function Dashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Key Financial Metrics */}
      <DashboardStats />

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <ExpenseChart />
        <NetWorthChart />
      </div>

      {/* Financial Management Widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
            Account Overview
          </h2>
          <div className="flex-1">
            <List01 className="h-full" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <PieChart className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
            Recent Transactions
          </h2>
          <div className="flex-1">
            <List02 className="h-full" />
          </div>
        </div>
      </div>

      {/* Financial Goals & AI Insights */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col items-start justify-start border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
          Financial Goals & AI Insights
        </h2>
        <List03 />
      </div>
    </div>
  )
}
