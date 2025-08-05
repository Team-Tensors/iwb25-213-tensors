import { useEffect, useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import TopNav from "../components/layout/TopNav"
import AIAssistantPanel from "../components/layout/AiAssistantPanel"
import { useTheme } from "@/context/ThemeContext"
import { Outlet } from "react-router-dom"

export default function Layout() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsSidebarCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!mounted) return null

  return (
    <div className={`flex h-screen overflow-hidden ${theme === "dark" ? "dark" : ""}`}>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex flex-1 min-w-0">
        <div className="flex flex-1 flex-col min-w-0">
          <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23] flex-shrink-0">
            <TopNav />
          </header>
          <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6 bg-gray-50 dark:bg-[#0A0A0B]">
            <Outlet />
          </main>
        </div>
        <AIAssistantPanel
          isOpen={isAIAssistantOpen}
          onToggle={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
        />
      </div>
    </div>
  )
}
