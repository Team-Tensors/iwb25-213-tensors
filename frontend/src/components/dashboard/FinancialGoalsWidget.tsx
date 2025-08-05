import { MessageSquare } from "lucide-react"
import FinancialGoalsList from "./FinancialGoalsList"

interface FinancialGoalsWidgetProps {
  className?: string
}

export default function FinancialGoalsWidget({ className }: FinancialGoalsWidgetProps) {
  return (
    <div className={`bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col items-start justify-start border border-gray-200 dark:border-[#1F1F23] ${className || ""}`}>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
        Financial Goals & AI Insights
      </h2>
      <FinancialGoalsList />
    </div>
  )
}
