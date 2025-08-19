"use client";
import { useLocalStorageTheme } from "../hooks/useLocalStorageTheme";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useLocalStorageTheme();

  if (!mounted) return null;

  console.log(document.documentElement.className);
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 
                 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-blue-700" />
      )}
    </button>
  );
}
