import { useState } from "react"
import { Plus, Edit, Trash2, CreditCard, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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

export default function DebtsPage() {
  const [debts, setDebts] = useState<Debt[]>([
    {
      id: "1",
      name: "Capital One Credit Card",
      type: "credit_card",
      currentBalance: 1200.0,
      originalAmount: 5000.0,
      interestRate: 18.99,
      minimumPayment: 35.0,
      dueDate: "2024-02-15",
      currency: "USD",
      description: "Rewards credit card",
      lender: "Capital One",
      lastUpdated: "2024-01-15",
    },
    {
      id: "2",
      name: "Student Loan",
      type: "student_loan",
      currentBalance: 25000.0,
      originalAmount: 35000.0,
      interestRate: 4.5,
      minimumPayment: 280.0,
      dueDate: "2024-02-01",
      currency: "USD",
      description: "Federal student loan",
      lender: "Federal Student Aid",
      lastUpdated: "2024-01-15",
    },
    {
      id: "3",
      name: "Auto Loan",
      type: "auto_loan",
      currentBalance: 15500.0,
      originalAmount: 22000.0,
      interestRate: 3.2,
      minimumPayment: 385.0,
      dueDate: "2024-02-10",
      currency: "USD",
      description: "2019 Honda Civic loan",
      lender: "Chase Auto Finance",
      lastUpdated: "2024-01-15",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newDebt, setNewDebt] = useState({
    name: "",
    type: "credit_card" as "credit_card" | "personal_loan" | "mortgage" | "student_loan" | "auto_loan" | "other",
    currentBalance: "",
    originalAmount: "",
    interestRate: "",
    minimumPayment: "",
    dueDate: "",
    currency: "USD",
    description: "",
    lender: "",
  })

  const handleAddDebt = () => {
    if (!newDebt.name || !newDebt.currentBalance || !newDebt.interestRate || !newDebt.minimumPayment || !newDebt.lender)
      return

    const debt: Debt = {
      id: crypto.randomUUID(),
      name: newDebt.name,
      type: newDebt.type,
      currentBalance: Number.parseFloat(newDebt.currentBalance),
      originalAmount: Number.parseFloat(newDebt.originalAmount) || Number.parseFloat(newDebt.currentBalance),
      interestRate: Number.parseFloat(newDebt.interestRate),
      minimumPayment: Number.parseFloat(newDebt.minimumPayment),
      dueDate: newDebt.dueDate,
      currency: newDebt.currency,
      description: newDebt.description,
      lender: newDebt.lender,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setDebts([...debts, debt])
    setNewDebt({
      name: "",
      type: "credit_card",
      currentBalance: "",
      originalAmount: "",
      interestRate: "",
      minimumPayment: "",
      dueDate: "",
      currency: "USD",
      description: "",
      lender: "",
    })
    setIsAddDialogOpen(false)
  }

  const totalDebt = debts.reduce((sum, debt) => sum + debt.currentBalance, 0)
  const totalMinimumPayments = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0)
  const averageInterestRate =
    debts.length > 0 ? debts.reduce((sum, debt) => sum + debt.interestRate, 0) / debts.length : 0

  const getDebtTypeLabel = (type: string) => {
    switch (type) {
      case "credit_card":
        return "Credit Card"
      case "personal_loan":
        return "Personal Loan"
      case "mortgage":
        return "Mortgage"
      case "student_loan":
        return "Student Loan"
      case "auto_loan":
        return "Auto Loan"
      default:
        return "Other"
    }
  }

  const calculatePayoffTime = (balance: number, payment: number, rate: number) => {
    if (payment <= 0) return "Never (no payment)"
    if (payment <= 0 || payment <= (balance * rate) / 100 / 12) return "Never (payment too low)"
    const monthlyRate = rate / 100 / 12
    const months = Math.ceil(Math.log(1 + (balance * monthlyRate) / payment) / Math.log(1 + monthlyRate))
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years > 0) {
      return `${years}y ${remainingMonths}m`
    } else {
      return `${months}m`
    }
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Debts</h1>
            <p className="text-gray-600 dark:text-gray-400">Track and manage your loans and credit card debt</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Debt
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Debt</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Debt Name</Label>
                  <Input
                    id="name"
                    value={newDebt.name}
                    onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
                    placeholder="Enter debt name"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Debt Type</Label>
                  <Select
                    value={newDebt.type}
                    onValueChange={(
                      value: "credit_card" | "personal_loan" | "mortgage" | "student_loan" | "auto_loan" | "other",
                    ) => setNewDebt({ ...newDebt, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="personal_loan">Personal Loan</SelectItem>
                      <SelectItem value="mortgage">Mortgage</SelectItem>
                      <SelectItem value="student_loan">Student Loan</SelectItem>
                      <SelectItem value="auto_loan">Auto Loan</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentBalance">Current Balance</Label>
                    <Input
                      id="currentBalance"
                      type="number"
                      step="0.01"
                      value={newDebt.currentBalance}
                      onChange={(e) => setNewDebt({ ...newDebt, currentBalance: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalAmount">Original Amount</Label>
                    <Input
                      id="originalAmount"
                      type="number"
                      step="0.01"
                      value={newDebt.originalAmount}
                      onChange={(e) => setNewDebt({ ...newDebt, originalAmount: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      value={newDebt.interestRate}
                      onChange={(e) => setNewDebt({ ...newDebt, interestRate: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minimumPayment">Minimum Payment</Label>
                    <Input
                      id="minimumPayment"
                      type="number"
                      step="0.01"
                      value={newDebt.minimumPayment}
                      onChange={(e) => setNewDebt({ ...newDebt, minimumPayment: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lender">Lender</Label>
                  <Input
                    id="lender"
                    value={newDebt.lender}
                    onChange={(e) => setNewDebt({ ...newDebt, lender: e.target.value })}
                    placeholder="Bank or lender name"
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Next Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newDebt.dueDate}
                    onChange={(e) => setNewDebt({ ...newDebt, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newDebt.description}
                    onChange={(e) => setNewDebt({ ...newDebt, description: e.target.value })}
                    placeholder="Optional description"
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddDebt} className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Debt
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Debt</h3>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">${totalDebt.toLocaleString()}</p>
              </div>
              <CreditCard className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Payments</h3>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  ${totalMinimumPayments.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Interest Rate</h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{averageInterestRate.toFixed(1)}%</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Debts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {debts.map((debt) => {
            const progressPercentage = (
              ((debt.originalAmount - debt.currentBalance) / debt.originalAmount) *
              100
            ).toFixed(1)
            const payoffTime = calculatePayoffTime(debt.currentBalance, debt.minimumPayment, debt.interestRate)

            return (
              <div
                key={debt.id}
                className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#1F1F23]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <CreditCard className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{debt.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{getDebtTypeLabel(debt.type)}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Balance</p>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">
                      ${debt.currentBalance.toLocaleString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Interest Rate</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{debt.interestRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Min Payment</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">${debt.minimumPayment}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
                    <div className="mt-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-900 dark:text-white">{progressPercentage}% paid off</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Payoff Time</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{payoffTime}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Lender</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{debt.lender}</p>
                  </div>

                  {debt.dueDate && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Next Due Date</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(debt.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {debt.description && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
                      <p className="text-sm text-gray-900 dark:text-white">{debt.description}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
  )
}
