import DashboardStats from "../components/dashboard/DashboardStats"
import ChartsGrid from "../components/dashboard/ChartsGrid"
import FinancialWidgetsGrid from "../components/dashboard/FinancialWidgetsGrid"
import FinancialGoalsWidget from "../components/dashboard/FinancialGoalsWidget"

export default function Dashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Key Financial Metrics */}
      <DashboardStats />

      {/* Charts Section */}
      <ChartsGrid />

      {/* Financial Management Widgets */}
      <FinancialWidgetsGrid />

      {/* Financial Goals & AI Insights */}
      <FinancialGoalsWidget />
    </div>
  )
}
