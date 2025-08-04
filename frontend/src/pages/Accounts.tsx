import { useState } from "react"
import { Plus, Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

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
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      name: "Main Checking",
      type: "checking",
      balance: 2850.0,
      currency: "USD",
      institution: "Chase Bank",
      lastUpdated: "2024-01-15",
    },
    {
      id: "2",
      name: "Emergency Savings",
      type: "savings",
      balance: 15000.0,
      currency: "USD",
      interestRate: 4.5,
      institution: "Ally Bank",
      lastUpdated: "2024-01-15",
    },
    {
      id: "3",
      name: "Investment Portfolio",
      type: "investment",
      balance: 45230.8,
      currency: "USD",
      institution: "Fidelity",
      lastUpdated: "2024-01-15",
    },
    {
      id: "4",
      name: "Credit Card",
      type: "credit",
      balance: -1200.0,
      currency: "USD",
      institution: "Capital One",
      lastUpdated: "2024-01-15",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "checking" as "checking" | "savings" | "investment" | "credit",
    balance: "",
    currency: "USD",
    interestRate: "",
    institution: "",
  })

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.balance || !newAccount.institution) return

    const account: Account = {
      id: crypto.randomUUID(),
      name: newAccount.name,
      type: newAccount.type,
      balance: Number.parseFloat(newAccount.balance),
      currency: newAccount.currency,
      interestRate: newAccount.interestRate ? Number.parseFloat(newAccount.interestRate) : undefined,
      institution: newAccount.institution,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setAccounts([...accounts, account])
    setNewAccount({
      name: "",
      type: "checking",
      balance: "",
      currency: "USD",
      interestRate: "",
      institution: "",
    })
    setIsAddDialogOpen(false)
  }

  const totalAssets = accounts.filter((a) => a.balance > 0).reduce((sum, a) => sum + a.balance, 0)
  const totalLiabilities = accounts.filter((a) => a.balance < 0).reduce((sum, a) => sum + Math.abs(a.balance), 0)
  const netWorth = totalAssets - totalLiabilities

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return "💳"
      case "savings":
        return "🏦"
      case "investment":
        return "📈"
      case "credit":
        return "💸"
      default:
        return "💰"
    }
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Accounts</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your bank accounts, investments, and credit cards</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Account</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Account Name</Label>
                  <Input
                    id="name"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                    placeholder="Enter account name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Account Type</Label>
                    <Select
                      value={newAccount.type}
                      onValueChange={(value: "checking" | "savings" | "investment" | "credit") =>
                        setNewAccount({ ...newAccount, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="credit">Credit Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="balance">Current Balance</Label>
                    <Input
                      id="balance"
                      type="number"
                      step="0.01"
                      value={newAccount.balance}
                      onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={newAccount.institution}
                    onChange={(e) => setNewAccount({ ...newAccount, institution: e.target.value })}
                    placeholder="Bank or institution name"
                  />
                </div>
                {(newAccount.type === "savings" || newAccount.type === "investment") && (
                  <div>
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      value={newAccount.interestRate}
                      onChange={(e) => setNewAccount({ ...newAccount, interestRate: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                )}
                <Button onClick={handleAddAccount} className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Account
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assets</h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${totalAssets.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Liabilities</h3>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  ${totalLiabilities.toLocaleString()}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Worth</h3>
                <p
                  className={`text-2xl font-bold ${netWorth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  ${netWorth.toLocaleString()}
                </p>
              </div>
              {netWorth >= 0 ? (
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-[#1F1F23]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getAccountIcon(account.type)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{account.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{account.type}</p>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Balance</p>
                  <p
                    className={`text-xl font-bold ${account.balance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    ${Math.abs(account.balance).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Institution</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{account.institution}</p>
                </div>

                {account.interestRate && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Interest Rate</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{account.interestRate}%</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(account.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}
