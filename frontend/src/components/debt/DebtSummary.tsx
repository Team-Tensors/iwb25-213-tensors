import { TrendingDown, CreditCard, DollarSign } from "lucide-react"

interface Debt {
  id: string
  name: string
  type: "credit_card" | "personal_loan" | "mortgage" | "student_loan" | "auto_loan" | "other"
  currentBalance: number
  originalAmount: number
  interestRate: number
  minimumPayment: number
  dueDate: string
  currency: string
  description?: string
  lender: string
  lastUpdated: string
}

interface DebtSummaryProps {
  debts: Debt[]
}

export default function DebtSummary({ debts }: DebtSummaryProps) {
  const totalDebt = debts.reduce((sum, debt) => sum + debt.currentBalance, 0)
  const totalMonthlyPayments = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0)
  const averageInterestRate = debts.length > 0 
    ? debts.reduce((sum, debt) => sum + debt.interestRate, 0) / debts.length 
    : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Debt</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              ${totalDebt.toLocaleString()}
            </p>
          </div>
          <div className="h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Payments</p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              ${totalMonthlyPayments.toLocaleString()}
            </p>
          </div>
          <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Interest Rate</p>
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {averageInterestRate.toFixed(1)}%
            </p>
          </div>
          <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
            <TrendingDown className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
