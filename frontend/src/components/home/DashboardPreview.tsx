export default function DashboardPreview() {
  return (
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
  )
}
