import ExpenseChart from "./ExpenseChart"
import NetWorthChart from "./NetWorthChart"

interface ChartsGridProps {
  className?: string
}

export default function ChartsGrid({ className }: ChartsGridProps) {
  return (
    <div className={`grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 ${className || ""}`}>
      <ExpenseChart />
      <NetWorthChart />
    </div>
  )
}
