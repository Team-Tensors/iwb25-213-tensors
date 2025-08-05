import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import TransactionsFilters from "../components/transactions/TransactionsFilters"
import TransactionsTable from "../components/transactions/TransactionsTable"

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
      amount: 85.32,
      account: "Checking Account",
      currency: "USD",
    },
    {
      id: "3",
      date: "2024-01-13",
      description: "Gas Station",
      category: "Transportation",
      type: "expense",
      amount: 45.00,
      account: "Credit Card",
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

  const [filteredTransactions, setFilteredTransactions] = useState(transactions)

  const handleSearchChange = (search: string) => {
    const filtered = transactions.filter(t => 
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredTransactions(filtered)
  }

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      setFilteredTransactions(transactions)
    } else {
      const filtered = transactions.filter(t => 
        t.category.toLowerCase() === category.toLowerCase()
      )
      setFilteredTransactions(filtered)
    }
  }

  const handleTypeChange = (type: string) => {
    if (type === "all") {
      setFilteredTransactions(transactions)
    } else {
      const filtered = transactions.filter(t => t.type === type)
      setFilteredTransactions(filtered)
    }
  }

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting transactions...")
  }

  const handleDeleteTransaction = (transactionId: string) => {
    const updated = transactions.filter(t => t.id !== transactionId)
    setTransactions(updated)
    setFilteredTransactions(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your income and expenses</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      <TransactionsFilters
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onTypeChange={handleTypeChange}
        onExport={handleExport}
      />

      <TransactionsTable 
        transactions={filteredTransactions}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  )
}
