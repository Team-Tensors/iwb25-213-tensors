import { useState } from "react"
import { Plus, Edit, Trash2, TrendingUp, TrendingDown, Home, Car, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Asset {
  id: string
  name: string
  type: "real_estate" | "vehicle" | "investment" | "fixed_deposit" | "other"
  currentValue: number
  purchasePrice: number
  purchaseDate: string
  currency: string
  description?: string
  appreciationRate?: number
  lastUpdated: string
}

export default function Assets() {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: "1",
      name: "Primary Residence",
      type: "real_estate",
      currentValue: 450000,
      purchasePrice: 380000,
      purchaseDate: "2020-06-15",
      currency: "USD",
      description: "3BR/2BA house in downtown",
      appreciationRate: 5.2,
      lastUpdated: "2024-01-15",
    },
    {
      id: "2",
      name: "2019 Honda Civic",
      type: "vehicle",
      currentValue: 18500,
      purchasePrice: 25000,
      purchaseDate: "2019-03-10",
      currency: "USD",
      description: "Reliable daily driver",
      lastUpdated: "2024-01-15",
    },
    {
      id: "3",
      name: "5-Year CD",
      type: "fixed_deposit",
      currentValue: 12500,
      purchasePrice: 10000,
      purchaseDate: "2022-01-01",
      currency: "USD",
      description: "Fixed deposit at 4.5% APY",
      appreciationRate: 4.5,
      lastUpdated: "2024-01-15",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newAsset, setNewAsset] = useState({
    name: "",
    type: "other" as "real_estate" | "vehicle" | "investment" | "fixed_deposit" | "other",
    currentValue: "",
    purchasePrice: "",
    purchaseDate: "",
    currency: "USD",
    description: "",
    appreciationRate: "",
  })

  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.currentValue || !newAsset.purchasePrice || !newAsset.purchaseDate) return

    const asset: Asset = {
      id: Date.now().toString(),
      name: newAsset.name,
      type: newAsset.type,
      currentValue: Number.parseFloat(newAsset.currentValue),
      purchasePrice: Number.parseFloat(newAsset.purchasePrice),
      purchaseDate: newAsset.purchaseDate,
      currency: newAsset.currency,
      description: newAsset.description,
      appreciationRate: newAsset.appreciationRate ? Number.parseFloat(newAsset.appreciationRate) : undefined,
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setAssets([...assets, asset])
    setNewAsset({
      name: "",
      type: "other",
      currentValue: "",
      purchasePrice: "",
      purchaseDate: "",
      currency: "USD",
      description: "",
      appreciationRate: "",
    })
    setIsAddDialogOpen(false)
  }

  const totalCurrentValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0)
  const totalPurchasePrice = assets.reduce((sum, asset) => sum + asset.purchasePrice, 0)
  const totalGainLoss = totalCurrentValue - totalPurchasePrice

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "real_estate":
        return <Home className="w-6 h-6" />
      case "vehicle":
        return <Car className="w-6 h-6" />
      case "investment":
        return <TrendingUp className="w-6 h-6" />
      case "fixed_deposit":
        return <Briefcase className="w-6 h-6" />
      default:
        return <Briefcase className="w-6 h-6" />
    }
  }

  const getAssetTypeLabel = (type: string) => {
    switch (type) {
      case "real_estate":
        return "Real Estate"
      case "vehicle":
        return "Vehicle"
      case "investment":
        return "Investment"
      case "fixed_deposit":
        return "Fixed Deposit"
      default:
        return "Other"
    }
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assets</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your appreciating and depreciating assets</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Asset Name</Label>
                  <Input
                    id="name"
                    value={newAsset.name}
                    onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                    placeholder="Enter asset name"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Asset Type</Label>
                  <Select
                    value={newAsset.type}
                    onValueChange={(value: "real_estate" | "vehicle" | "investment" | "fixed_deposit" | "other") =>
                      setNewAsset({ ...newAsset, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real_estate">Real Estate</SelectItem>
                      <SelectItem value="vehicle">Vehicle</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="fixed_deposit">Fixed Deposit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentValue">Current Value</Label>
                    <Input
                      id="currentValue"
                      type="number"
                      step="0.01"
                      value={newAsset.currentValue}
                      onChange={(e) => setNewAsset({ ...newAsset, currentValue: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="purchasePrice">Purchase Price</Label>
                    <Input
                      id="purchasePrice"
                      type="number"
                      step="0.01"
                      value={newAsset.purchasePrice}
                      onChange={(e) => setNewAsset({ ...newAsset, purchasePrice: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={newAsset.purchaseDate}
                    onChange={(e) => setNewAsset({ ...newAsset, purchaseDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="appreciationRate">Appreciation Rate (% per year)</Label>
                  <Input
                    id="appreciationRate"
                    type="number"
                    step="0.01"
                    value={newAsset.appreciationRate}
                    onChange={(e) => setNewAsset({ ...newAsset, appreciationRate: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newAsset.description}
                    onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                    placeholder="Optional description"
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddAsset} className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Asset
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Current Value</h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${totalCurrentValue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Purchase Price</h3>
                <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                  ${totalPurchasePrice.toLocaleString()}
                </p>
              </div>
              <Briefcase className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
          <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Gain/Loss</h3>
                <p
                  className={`text-2xl font-bold ${totalGainLoss >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {totalGainLoss >= 0 ? "+" : ""}${totalGainLoss.toLocaleString()}
                </p>
              </div>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {assets.map((asset) => {
            const gainLoss = asset.currentValue - asset.purchasePrice
            const gainLossPercentage = ((gainLoss / asset.purchasePrice) * 100).toFixed(1)

            return (
              <div
                key={asset.id}
                className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 dark:bg-[#1F1F23] rounded-lg">{getAssetIcon(asset.type)}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{asset.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{getAssetTypeLabel(asset.type)}</p>
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Value</p>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      ${asset.currentValue.toLocaleString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Purchase Price</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ${asset.purchasePrice.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Gain/Loss</p>
                      <p
                        className={`text-sm font-medium ${gainLoss >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                      >
                        {gainLoss >= 0 ? "+" : ""}${gainLoss.toLocaleString()} ({gainLossPercentage}%)
                      </p>
                    </div>
                  </div>

                  {asset.appreciationRate && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Appreciation Rate</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {asset.appreciationRate}% per year
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Purchase Date</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(asset.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>

                  {asset.description && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
                      <p className="text-sm text-gray-900 dark:text-white">{asset.description}</p>
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
