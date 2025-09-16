'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to avoid layout shift
    return (
      <button
        className="inline-flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-slate-800/50 dark:hover:bg-slate-200/10"
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-slate-800/50 hover:text-slate-100 dark:text-slate-400 dark:hover:bg-slate-200/10 dark:hover:text-slate-100"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5 transition-all duration-200 rotate-0 scale-100" />
      ) : (
        <Moon className="h-5 w-5 transition-all duration-200 rotate-0 scale-100" />
      )}
    </button>
  );
}