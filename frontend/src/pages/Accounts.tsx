import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AccountsSummary from "@/components/accounts/AccountsSummary"
import AccountsTable from "@/components/accounts/AccountsTable"
import AddAccountDialog from "@/components/accounts/AddAccountDialog"

// Mock data - in a real app, this would come from an API
const mockAccounts = [
  {
    id: "1",
    name: "Primary Checking",
    type: "checking" as const,
    balance: 5250.75,
    currency: "USD",
    institution: "Chase Bank",
    lastUpdated: "2025-01-05T10:30:00Z"
  },
  {
    id: "2",
    name: "High Yield Savings",
    type: "savings" as const,
    balance: 15430.20,
    currency: "USD",
    interestRate: 4.5,
    institution: "Marcus by Goldman Sachs",
    lastUpdated: "2025-01-05T09:15:00Z"
  },
  {
    id: "3",
    name: "Investment Portfolio",
    type: "investment" as const,
    balance: 42850.90,
    currency: "USD",
    interestRate: 7.2,
    institution: "Vanguard",
    lastUpdated: "2025-01-04T16:45:00Z"
  },
  {
    id: "4",
    name: "Credit Card",
    type: "credit" as const,
    balance: -2150.30,
    currency: "USD",
    interestRate: 18.9,
    institution: "Capital One",
    lastUpdated: "2025-01-05T08:20:00Z"
  }
]

interface Account {
  id: string
  name: string
  type: "checking" | "savings" | "investment" | "credit"
  balance: number
  currency: string
  interestRate?: number
  institution: string
  lastUpdated: string
}

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts)
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>(mockAccounts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  // Filter accounts based on search term and type filter
  useEffect(() => {
    let filtered = accounts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (account) =>
          account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.institution.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by account type
    if (filterType !== "all") {
      filtered = filtered.filter((account) => account.type === filterType)
    }

    setFilteredAccounts(filtered)
  }, [accounts, searchTerm, filterType])

  const handleAddAccount = (newAccountData: Omit<Account, "id" | "lastUpdated">) => {
    const newAccount: Account = {
      ...newAccountData,
      id: Date.now().toString(),
      balance: parseFloat(newAccountData.balance.toString()),
      lastUpdated: new Date().toISOString()
    }
    setAccounts([...accounts, newAccount])
  }

  const handleEditAccount = (account: Account) => {
    // In a real app, this would open an edit dialog
    console.log("Edit account:", account)
    // For now, we'll just log it
  }

  const handleDeleteAccount = (accountId: string) => {
    if (confirm("Are you sure you want to delete this account?")) {
      setAccounts(accounts.filter((account) => account.id !== accountId))
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Accounts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your financial accounts and track your balances
          </p>
        </div>
        <AddAccountDialog onAddAccount={handleAddAccount} />
      </div>

      {/* Summary Cards */}
      <AccountsSummary accounts={accounts} />

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search accounts or institutions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Type Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Results count */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredAccounts.length} of {accounts.length} accounts
          </p>
        </CardContent>
      </Card>

      {/* Accounts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredAccounts.length > 0 ? (
            <AccountsTable
              accounts={filteredAccounts}
              onEditAccount={handleEditAccount}
              onDeleteAccount={handleDeleteAccount}
            />
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No accounts found matching your criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setFilterType("all")
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>
              💡 <strong>Tip:</strong> Keep your accounts updated regularly to maintain accurate financial tracking.
            </p>
            <p>
              🔒 <strong>Security:</strong> Your account data is encrypted and securely stored.
            </p>
            <p>
              📊 <strong>Analytics:</strong> View detailed insights and trends in the Dashboard section.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
