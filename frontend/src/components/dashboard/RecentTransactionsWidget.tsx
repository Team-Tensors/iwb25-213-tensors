import { PieChart } from "lucide-react"
import TransactionsList from "./TransactionsList"

interface RecentTransactionsWidgetProps {
  className?: string
}

export default function RecentTransactionsWidget({ className }: RecentTransactionsWidgetProps) {
  return (
    <div className={`bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23] ${className || ""}`}>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
        <PieChart className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
        Recent Transactions
      </h2>
      <div className="flex-1">
        <TransactionsList className="h-full" />
      </div>
    </div>
  )
}
