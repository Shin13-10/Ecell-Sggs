import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  // Always force light theme
  const [theme, setTheme] = useState<Theme>("light");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Apply theme to document (Always light)
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    setIsDarkMode(false);

    // Update meta theme color
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content', '#ffffff'
    );

    localStorage.setItem("theme", "light");
  }, []); // Run once on mount

  // No-op for toggling or setting theme (enforce light)
  const toggleTheme = () => { };
  const setThemeFn = (t: Theme) => { };

  const value = {
    theme: "light" as Theme,
    setTheme: setThemeFn,
    isDarkMode: false,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};