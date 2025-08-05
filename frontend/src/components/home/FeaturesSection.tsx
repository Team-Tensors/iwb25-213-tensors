import { BarChart3, DollarSign, TrendingUp, Zap, CreditCard, Target } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Manage Your Wealth</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive financial management tools powered by AI to help you make smarter decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle className="text-white">Smart Dashboard</CardTitle>
              <CardDescription className="text-gray-400">
                Get a complete overview of your finances with real-time insights and beautiful visualizations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle className="text-white">Transaction Tracking</CardTitle>
              <CardDescription className="text-gray-400">
                Automatically categorize and track all your expenses and income across multiple accounts
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle className="text-white">Investment Portfolio</CardTitle>
              <CardDescription className="text-gray-400">
                Monitor your investments, track performance, and get AI-powered recommendations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-orange-600/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-orange-500" />
              </div>
              <CardTitle className="text-white">AI Assistant</CardTitle>
              <CardDescription className="text-gray-400">
                Get personalized financial advice and automate tasks with our intelligent AI assistant
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-red-600/20 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle className="text-white">Debt Management</CardTitle>
              <CardDescription className="text-gray-400">
                Track loans, credit cards, and create payoff strategies to become debt-free faster
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-teal-600/20 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-teal-500" />
              </div>
              <CardTitle className="text-white">Goal Setting</CardTitle>
              <CardDescription className="text-gray-400">
                Set and track financial goals with AI-powered insights and progress monitoring
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}
