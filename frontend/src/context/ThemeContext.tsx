// src/context/ThemeContext.tsx
import React, { createContext, useEffect, useState, useContext } from "react"

type Theme = "light" | "dark"

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("light")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const initialTheme = storedTheme || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
