// Sidebar.tsx
import React, { useState } from "react"
import { BarChart2, Receipt, Building2, CreditCard, Wallet, Settings, HelpCircle, Menu, X, ChevronLeft, ChevronRight, Home, } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    to,
    icon: Icon,
    children,
  }: {
    to: string
    icon: React.ElementType
    children: React.ReactNode
  }) {
    const isActive = location.pathname === to

    return (
      <Link
        to={to}
        onClick={handleNavigation}
        className={`flex items-center px-3 py-2.5 text-sm rounded-lg transition-all duration-200 group ${
          isActive
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm"
            : "text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        }`}
        title={isCollapsed ? children?.toString() : undefined}
      >
        <Icon className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? "mx-auto" : "mr-3"}`} />
        {!isCollapsed && <span className="truncate">{children}</span>}
      </Link>
    )
  }

  const navigationItems = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/transactions", icon: Receipt, label: "Transactions" },
    { to: "/accounts", icon: Wallet, label: "Accounts" },
    { to: "/assets", icon: Building2, label: "Assets" },
    { to: "/debts", icon: CreditCard, label: "Debts" },
    { to: "/ai-insights", icon: BarChart2, label: "AI Insights" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-lg border border-gray-200 dark:border-[#1F1F23]"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <nav
        className={`hidden lg:flex flex-col bg-white dark:bg-[#0F0F12] border-r border-gray-200 dark:border-[#1F1F23] 
          transition-all duration-300 ease-in-out flex-shrink-0 relative ${
            isCollapsed ? "w-16" : "w-64"
          }`}
      >
        {/* Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-gray-200 dark:border-[#1F1F23] flex-shrink-0">
          {!isCollapsed && (
            <span className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              Finance Manager
            </span>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1F1F23] transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {navigationItems.map((item, index) => (
              <NavItem key={index} to={item.to} icon={item.icon}>
                {item.label}
              </NavItem>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-gray-200 dark:border-[#1F1F23] flex-shrink-0">
          <div className="space-y-1">
            <NavItem to="/settings" icon={Settings}>
              Settings
            </NavItem>
            <NavItem to="/help" icon={HelpCircle}>
              Help
            </NavItem>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <nav
        className={`fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-300 ease-in-out
          lg:hidden border-r border-gray-200 dark:border-[#1F1F23] ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23] flex-shrink-0">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Personal Finance Manager
            </span>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-1">
              {navigationItems.map((item, index) => (
                <NavItem key={index} to={item.to} icon={item.icon}>
                  {item.label}
                </NavItem>
              ))}
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23] flex-shrink-0">
            <div className="space-y-1">
              <NavItem to="/settings" icon={Settings}>
                Settings
              </NavItem>
              <NavItem to="/help" icon={HelpCircle}>
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
