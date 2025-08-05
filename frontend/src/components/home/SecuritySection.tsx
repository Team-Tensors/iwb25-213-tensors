import { Shield, Smartphone, PieChart } from "lucide-react"

export default function SecuritySection() {
  return (
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
  )
}
