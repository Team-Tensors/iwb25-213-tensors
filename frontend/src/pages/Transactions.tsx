import { useState } from "react"
import { Plus, Search, Download, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Transaction {
  id: string
  date: string
  description: string
  category: string
  type: "income" | "expense" | "transfer"
  amount: number
  account: string
  currency: string
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2024-01-15",
      description: "Salary Deposit",
      category: "Salary",
      type: "income",
      amount: 7500,
      account: "Checking Account",
      currency: "USD",
    },
    {
      id: "2",
      date: "2024-01-14",
      description: "Grocery Shopping",
      category: "Food & Dining",
      type: "expense",
      amount: 125.5,
      account: "Credit Card",
      currency: "USD",
    },
    {
      id: "3",
      date: "2024-01-13",
      description: "Netflix Subscription",
      category: "Entertainment",
      type: "expense",
      amount: 15.99,
      account: "Checking Account",
      currency: "USD",
    },
    {
      id: "4",
      date: "2024-01-12",
      description: "Transfer to Savings",
      category: "Transfer",
      type: "transfer",
      amount: 1000,
      account: "Savings Account",
      currency: "USD",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const [newTransaction, setNewTransaction] = useState({
    description: "",
    category: "",
    type: "expense" as "income" | "expense" | "transfer",
    amount: "",
    account: "",
    currency: "USD",
    date: new Date().toISOString().split("T")[0],
  })

  const categories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Salary",
    "Investment",
    "Transfer",
    "Other",
  ]

  const accounts = ["Checking Account", "Savings Account", "Credit Card", "Investment Account"]

  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount) return

    const transaction: Transaction = {
      id: Date.now().toString(),
      date: newTransaction.date,
      description: newTransaction.description,
      category: newTransaction.category,
      type: newTransaction.type,
      amount: Number.parseFloat(newTransaction.amount),
      account: newTransaction.account,
      currency: newTransaction.currency,
    }

    setTransactions([transaction, ...transactions])
    setNewTransaction({
      description: "",
      category: "",
      type: "expense",
      amount: "",
      account: "",
      currency: "USD",
      date: new Date().toISOString().split("T")[0],
    })
    setIsAddDialogOpen(false)
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory

    return matchesSearch && matchesType && matchesCategory
  })

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  return (
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Manage your income, expenses, and transfers
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg mx-4">
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    placeholder="Enter description"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newTransaction.type}
                      onValueChange={(value: "income" | "expense" | "transfer") =>
                        setNewTransaction({ ...newTransaction, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newTransaction.category}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="account">Account</Label>
                  <Select
                    value={newTransaction.account}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, account: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account} value={account}>
                          {account}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddTransaction} className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Transaction
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Income</h3>
            <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
              ${totalIncome.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#1F1F23]">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</h3>
            <p className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">
              ${totalExpenses.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#1F1F23] sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Income</h3>
            <p
              className={`text-xl sm:text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              ${(totalIncome - totalExpenses).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 dark:bg-[#1F1F23]">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                    Category
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                    Account
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#1F1F23]">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 dark:text-white">
                      <div className="truncate max-w-[150px] sm:max-w-none">{transaction.description}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                        {transaction.category} • {transaction.account}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                      {transaction.category}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 hidden md:table-cell">
                      {transaction.account}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span
                        className={
                          transaction.type === "income"
                            ? "text-green-600 dark:text-green-400"
                            : transaction.type === "expense"
                              ? "text-red-600 dark:text-red-400"
                              : "text-blue-600 dark:text-blue-400"
                        }
                      >
                        {transaction.type === "income" ? "+" : transaction.type === "expense" ? "-" : ""}$
                        {transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}
