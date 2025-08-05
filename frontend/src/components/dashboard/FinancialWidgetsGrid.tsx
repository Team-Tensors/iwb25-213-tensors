import AccountOverviewWidget from "./AccountOverviewWidget"
import RecentTransactionsWidget from "./RecentTransactionsWidget"

interface FinancialWidgetsGridProps {
  className?: string
}

export default function FinancialWidgetsGrid({ className }: FinancialWidgetsGridProps) {
  return (
    <div className={`grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 ${className || ""}`}>
      <AccountOverviewWidget />
      <RecentTransactionsWidget />
    </div>
  )
}
