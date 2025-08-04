import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/context/ThemeContext"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
    >
      <Sun className={`h-5 w-5 text-gray-600 dark:text-gray-300 transition-all ${theme === "dark" ? "hidden" : "block"}`} />
      <Moon className={`h-5 w-5 text-gray-600 dark:text-gray-300 transition-all ${theme === "dark" ? "block" : "hidden"}`} />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
