import { TrendingUp } from "lucide-react"
import AccountsList from "./AccountsList"

interface AccountOverviewWidgetProps {
  className?: string
}

export default function AccountOverviewWidget({ className }: AccountOverviewWidgetProps) {
  return (
    <div className={`bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23] ${className || ""}`}>
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
        Account Overview
      </h2>
      <div className="flex-1">
        <AccountsList className="h-full" />
      </div>
    </div>
  )
}
