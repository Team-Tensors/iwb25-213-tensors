import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"

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

interface AssetsSummaryProps {
  assets: Asset[]
}

export default function AssetsSummary({ assets }: AssetsSummaryProps) {
  const totalCurrentValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0)
  const totalPurchaseValue = assets.reduce((sum, asset) => sum + asset.purchasePrice, 0)
  const totalGainLoss = totalCurrentValue - totalPurchaseValue
  const averageAppreciation = assets.length > 0 
    ? assets
        .filter(asset => asset.appreciationRate)
        .reduce((sum, asset) => sum + (asset.appreciationRate || 0), 0) / 
      assets.filter(asset => asset.appreciationRate).length
    : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assets Value</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${totalCurrentValue.toLocaleString()}
            </p>
          </div>
          <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Gain/Loss</p>
            <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {totalGainLoss >= 0 ? "+" : ""}${totalGainLoss.toLocaleString()}
            </p>
          </div>
          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${totalGainLoss >= 0 ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"}`}>
            {totalGainLoss >= 0 ? (
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Appreciation</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {averageAppreciation.toFixed(1)}%
            </p>
          </div>
          <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
