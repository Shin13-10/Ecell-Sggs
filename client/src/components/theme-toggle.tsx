import { Moon, Sun, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme-provider";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme, isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full relative overflow-hidden group"
            onClick={(e) => {
              // If clicked directly (not on dropdown arrow), toggle theme
              if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.icon-container')) {
                e.preventDefault();
                toggleTheme();
                return false;
              }
            }}
          >
            <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <div className="icon-container relative z-10">
              {isDarkMode ? (
                <motion.div
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon className="h-5 w-5 transition-all" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -30, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun className="h-5 w-5 transition-all" />
                </motion.div>
              )}
            </div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem 
            onClick={() => setTheme("light")}
            className={`flex items-center ${theme === 'light' ? 'bg-primary/10 dark:bg-primary/20' : ''}`}
          >
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("dark")}
            className={`flex items-center ${theme === 'dark' ? 'bg-primary/10 dark:bg-primary/20' : ''}`}
          >
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("system")}
            className={`flex items-center ${theme === 'system' ? 'bg-primary/10 dark:bg-primary/20' : ''}`}
          >
            <SunMoon className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 