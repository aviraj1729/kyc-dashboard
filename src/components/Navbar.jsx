"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";

export default function Navbar({ page }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Breadcrumb */}
          <div className="flex items-center space-x-2 ml-12 lg:ml-0">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Home
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 dark:text-gray-500">/</span>
                </li>
                <li>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {page}
                  </span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:block relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-64 pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {currentDate}
                </p>
              </div>
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
