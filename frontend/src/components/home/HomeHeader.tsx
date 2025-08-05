import { Button } from "@/components/ui/button"

export default function HomeHeader() {
  return (
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
  )
}
