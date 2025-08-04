import { ArrowRight, BarChart3, Shield, Smartphone, TrendingUp, Zap, DollarSign, PieChart, CreditCard, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <div className="h-4 w-4 rounded-sm bg-white transform rotate-45"></div>
              </div>
              <span className="text-xl font-bold">FinanceHub</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 bg-transparent">
                Sign In
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Take Control of Your Financial Future
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Take control of your financial future with our comprehensive Personal Finance & Asset Manager. Track
              expenses, manage investments, and get personalized AI recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800 text-lg px-8 py-3 bg-transparent"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-500/20 blur-3xl"></div>
            <div className="relative bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                </div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pstsuK1Xy7Ss199qTMEIJkAIEBiNFx.png"
                  alt="FinanceHub Dashboard"
                  width={1200}
                  height={700}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">$2.5B+</div>
              <div className="text-gray-400">Assets Under Management</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">50K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500 mb-2">99.9%</div>
              <div className="text-gray-400">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-16 w-16 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Bank-Level Security</h2>
            <p className="text-xl text-gray-400 mb-8">
              Your financial data is protected with enterprise-grade security, OAuth 2.0 authentication, and end-to-end
              encryption. We never store your banking credentials.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">256-bit Encryption</h3>
                <p className="text-gray-400 text-sm">All data encrypted in transit and at rest</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">2FA Authentication</h3>
                <p className="text-gray-400 text-sm">Multi-factor authentication for added security</p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <PieChart className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">SOC 2 Compliant</h3>
                <p className="text-gray-400 text-sm">Audited security and compliance standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/20 to-blue-600/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their financial lives with FinanceHub
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-sm bg-white transform rotate-45"></div>
                </div>
                <span className="text-xl font-bold">FinanceHub</span>
              </div>
              <p className="text-gray-400">Empowering financial freedom through intelligent money management.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FinanceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
