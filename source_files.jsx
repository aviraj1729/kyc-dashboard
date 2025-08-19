// src/components/LoadingSkeleton.jsx
export default function LoadingSkeleton({ className = "", variant = "card" }) {
  const skeletonVariants = {
    card: "h-32 w-full rounded-lg",
    chart: "h-64 w-full rounded-lg",
    text: "h-4 w-3/4 rounded",
    circle: "h-12 w-12 rounded-full"
  };

  return (
    <div 
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${skeletonVariants[variant]} ${className}`}
      role="status" 
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}



// src/components/Navbar.jsx
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




// src/components/ProgressBar.jsx
export default function ProgressBar({ label, current, total, color = "blue" }) {
  const percentage = Math.round((current / total) * 100);
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-gray-500 dark:text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`${colorClasses[color]} h-2 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{current.toLocaleString()}</span>
        <span>{total.toLocaleString()}</span>
      </div>
    </div>
  );
}



// src/components/Sidebar.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  DocumentTextIcon,
  CreditCardIcon,
  ClipboardDocumentListIcon,
  DocumentDuplicateIcon,
  BellAlertIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Applications", href: "/applications", icon: DocumentTextIcon },
  { name: "Billing", href: "/billing", icon: CreditCardIcon },
  { name: "Rate Card", href: "/rate-card", icon: ClipboardDocumentListIcon },
  { name: "Agreement Copy", href: "/agreement", icon: DocumentDuplicateIcon },
  { name: "Notices", href: "/notices", icon: BellAlertIcon },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="h-full">
      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden fixed top-2 left-2 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden h-full fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed h-full lg:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-900 
        shadow-lg border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PPY</span>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              PPY Technologies
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                      }
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon
                      className={`
                      mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200
                      ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                      }
                    `}
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}




// src/components/Tabs.jsx
"use client";

import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function Tabs({ activeTab, onTabChange, onCustomDateChange }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const tabs = [
    { id: "today", label: "Today" },
    { id: "thisMonth", label: "This Month" },
    { id: "custom", label: "Custom" },
  ];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    if (tabId === "custom") {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
  };

  const handleDateChange = (type, value) => {
    if (type === "start") {
      setStartDate(value);
      onCustomDateChange({ start: value, end: endDate });
    } else {
      setEndDate(value);
      onCustomDateChange({ start: startDate, end: value });
    }
  };

  return (
    <div className="space-y-4 flex flex-row">
      {/* Tabs */}
      <div className="flex flex-row space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
              ${
                activeTab === tab.id
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              }
            `}
          >
            {tab.id === "custom" && <CalendarIcon className="h-4 w-4" />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Date Range Picker */}
      {showDatePicker && activeTab === "custom" && (
        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              From:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleDateChange("start", e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              To:
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleDateChange("end", e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}





// src/components/ThemeToggle.jsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 
                 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  );
}




// src/app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-y-hidden`}
      >
        {/* Wrap the entire app with Providers */}
        <Providers>
          <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 fixed left-0 top-0 h-full z-30">
              <Sidebar />
            </aside>

            {/* Main content */}
            <div className="flex-1 lg:ml-64">
              {/* Navbar */}
              <nav className="h-14 fixed top-0 left-0 lg:left-64 right-0 z-20">
                <Navbar page="Dashboard" />
              </nav>

              {/* Page content */}
              <main className="pt-14 overflow-y-auto h-full bg-white dark:bg-gray-900 transition-colors duration-300">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}




// src/app/page.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// --- Helper Functions for Dynamic Data Generation ---

const getFormattedDate = (date) => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "short" });
  const day = d.getDate();
  return `${month} ${day}`;
};

const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

// --- Dynamic Mock Data Generation ---
const generateMockDataForRange = (activeTab, customDate) => {
  let daysInPeriod = 7; // Default to a week
  let chartDataDates = [];
  const today = new Date();

  // Determine the number of days and dates for the chart based on the selected tab
  if (activeTab === "today") {
    daysInPeriod = 1;
    chartDataDates = [today];
  } else if (activeTab === "thisMonth") {
    const year = today.getFullYear();
    const month = today.getMonth();
    chartDataDates = getDaysInMonth(year, month);
    daysInPeriod = chartDataDates.length;
  } else if (activeTab === "custom" && customDate.start && customDate.end) {
    chartDataDates = getDatesInRange(customDate.start, customDate.end);
    daysInPeriod = chartDataDates.length;
  } else {
    // Fallback to a weekly view
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    chartDataDates = daysOfWeek.map((day) => new Date()); // Using a dummy date, name is used instead
  }

  // Generate randomized data based on the period duration
  const baseMultiplier = Math.max(1, daysInPeriod * 0.5);
  const randomValue = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const newKycCount = randomValue(100, 500) * baseMultiplier;
  const modifiedKycCount = randomValue(20, 100) * baseMultiplier;
  const trendNewKyc = Math.random() > 0.5 ? "up" : "down";
  const trendModifiedKyc = Math.random() > 0.5 ? "up" : "down";

  // Generate chart data for each date in the period
  const chartData = chartDataDates.map((date) => {
    return {
      name: activeTab === "today" ? "Today" : getFormattedDate(date),
      initiated: randomValue(150, 450),
      registered: randomValue(100, 300),
    };
  });

  const circularChartData = [
    { name: "Solicited", value: randomValue(300, 500) * baseMultiplier },
    { name: "Received", value: randomValue(200, 400) * baseMultiplier },
    { name: "Consumed", value: randomValue(150, 300) * baseMultiplier },
    { name: "Pending", value: randomValue(50, 150) * baseMultiplier },
  ];

  const kycStatus = {
    initiated: randomValue(2000, 3000) * baseMultiplier,
    underProcess: randomValue(1000, 1500) * baseMultiplier,
    registered: randomValue(700, 1000) * baseMultiplier,
    validated: randomValue(400, 600) * baseMultiplier,
    hold: randomValue(100, 200) * baseMultiplier,
    docsPending: randomValue(150, 250) * baseMultiplier,
  };

  const panStats = {
    solicited: {
      withImage: randomValue(1200, 1800) * baseMultiplier,
      withoutImage: randomValue(400, 600) * baseMultiplier,
    },
    dataReceived: {
      withImage: randomValue(900, 1300) * baseMultiplier,
      withoutImage: randomValue(200, 400) * baseMultiplier,
    },
  };

  return {
    totalKyc: {
      newKyc: {
        count: newKycCount,
        percentageChange: randomValue(5, 20),
        trend: trendNewKyc,
      },
      modifiedKyc: {
        count: modifiedKycCount,
        percentageChange: randomValue(3, 10),
        trend: trendModifiedKyc,
      },
    },
    chartData: chartData,
    circularChartData: circularChartData,
    kycStatus: kycStatus,
    panStats: panStats,
    categories: {
      individual: {
        ri: { current: randomValue(60, 90), total: 100 },
        nri: { current: randomValue(40, 60), total: 100 },
      },
      nonIndividual: {
        ri: { current: randomValue(80, 100), total: 100 },
        nri: { current: randomValue(50, 80), total: 100 },
      },
    },
  };
};

// --- Sub-Components ---

const KYCStatsCard = ({ title, count, percentage, trend }) => {
  const isPositive = trend === "up";
  const trendColor = isPositive
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";
  const TrendIcon = isPositive ? ArrowUpIcon : ArrowDownIcon;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
          {Math.round(count).toLocaleString()}
        </p>
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <TrendIcon className={`h-5 w-5 ${trendColor}`} />
        <span className={`text-sm font-medium ${trendColor}`}>
          {Math.abs(percentage)}%
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          vs Last Month
        </span>
      </div>
    </div>
  );
};

const BarChartComponent = ({ data, isDarkMode }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Daily KYC Progress
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDarkMode ? "#4b5563" : "#e5e7eb"}
            />
            <XAxis dataKey="name" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
            <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                borderColor: isDarkMode ? "#4b5563" : "#e5e7eb",
                borderRadius: "8px",
              }}
              labelStyle={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
            />
            <Bar dataKey="initiated" fill="#3b82f6" name="Initiated" />
            <Bar dataKey="registered" fill="#10b981" name="Registered" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CircularChartComponent = ({ data, isDarkMode }) => {
  const DEFAULT_COLORS = ["#4285F4", "#34A853", "#F9AB00", "#EA4335"];

  const colorByName = React.useMemo(() => {
    const map = new Map();
    data.forEach((d, i) =>
      map.set(d.name, DEFAULT_COLORS[i % DEFAULT_COLORS.length]),
    );
    return map;
  }, [data]);

  const [active, setActive] = useState(() =>
    Object.fromEntries(data.map((d) => [d.name, true])),
  );

  useEffect(() => {
    setActive((prev) => {
      const next = {};
      data.forEach((d) => (next[d.name] = prev[d.name] ?? true));
      return next;
    });
  }, [data]);

  const handleLegendClick = (name) => {
    setActive((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const filteredData = data.filter((d) => active[d.name]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Solicitation Status
      </h3>
      <div className="h-64 flex flex-col justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {filteredData.map((entry, idx) => (
                <Cell
                  key={entry.name}
                  fill={
                    colorByName.get(entry.name) ??
                    DEFAULT_COLORS[idx % DEFAULT_COLORS.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                borderColor: isDarkMode ? "#4b5563" : "#e5e7eb",
                borderRadius: "8px",
              }}
              labelStyle={{ color: isDarkMode ? "#e5e7eb" : "#1f2937" }}
            />
            {/* The Recharts Legend component is no longer needed */}
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* --- This is the standalone legend --- */}
      <ul className="flex flex-wrap justify-center gap-4 mt-4 text-sm font-medium">
        {data.map((d) => {
          const name = d.name;
          const on = !!active[name];
          return (
            <li
              key={name}
              onClick={() => handleLegendClick(name)}
              className={`flex items-center gap-2 cursor-pointer transition-opacity ${
                on ? "opacity-100" : "opacity-50"
              }`}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colorByName.get(name) }}
              />
              <span
                className={`${
                  on
                    ? "text-gray-700 dark:text-gray-300"
                    : "text-gray-400 dark:text-gray-500 line-through"
                }`}
              >
                {name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const ProgressBar = ({ label, current, total, color }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {Math.round(current).toLocaleString()}/
          {Math.round(total).toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full bg-${color}-500 transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const Tabs = ({ activeTab, onTabChange, onCustomDateChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const tabs = [
    { id: "today", label: "Today" },
    { id: "thisMonth", label: "This Month" },
    { id: "custom", label: "Custom" },
  ];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    if (tabId === "custom") {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
    }
  };

  const handleDateChange = (type, value) => {
    if (type === "start") {
      setStartDate(value);
      onCustomDateChange({ start: value, end: endDate });
    } else {
      setEndDate(value);
      onCustomDateChange({ start: startDate, end: value });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
      <div className="flex flex-row space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              flex items-center justify-center space-x-2 px-4 h-10 text-sm font-medium rounded-md transition-all duration-200
              ${
                activeTab === tab.id
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              }
            `}
          >
            {tab.id === "custom" && <CalendarIcon className="h-4 w-4" />}
            {tab.label}
          </button>
        ))}
      </div>
      {showDatePicker && activeTab === "custom" && (
        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            From:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange("start", e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            To:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange("end", e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};

const ViewTypeToggle = ({ activeView, onViewChange }) => {
  const views = [
    { id: "individual", label: "Individual" },
    { id: "nonIndividual", label: "Non-Individual" },
  ];

  return (
    <div className="flex flex-1 space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => onViewChange(view.id)}
          className={`
            flex-1 px-4 h-10 text-sm font-medium rounded-md transition-all duration-200
            ${
              activeView === view.id
                ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            }
          `}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
};

const LoadingSkeleton = ({ variant, className = "" }) => {
  if (variant === "card") {
    return (
      <div
        className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg shadow-sm ${className}`}
      ></div>
    );
  }
  if (variant === "chart") {
    return (
      <div
        className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl shadow-sm h-72 ${className}`}
      ></div>
    );
  }
  if (variant === "text") {
    return (
      <div className={`space-y-2`}>
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    );
  }
  return null;
};

// --- Main App Component ---

const KYCPanStatsCard = ({ title, subtitle, count, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
      {title}
    </p>
    <p className={`text-xl font-bold text-gray-900 dark:text-white mb-1`}>
      {Math.round(count).toLocaleString()}
    </p>
    <p className={`text-xs text-${color}-600 dark:text-${color}-400`}>
      {subtitle}
    </p>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState("today");
  const [activeView, setActiveView] = useState("individual");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customDate, setCustomDate] = useState("");
  const isDarkMode = false; // Resolved theme is not available in a self-contained component

  // Mimic data fetching
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Use the new dynamic data generation function
      setDashboardData(generateMockDataForRange(activeTab, customDate));
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [activeTab, activeView, customDate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const handleCustomDateChange = (date) => {
    setCustomDate(date);
  };

  const kycStatusItems = [
    {
      label: "KYC Initiated",
      value: dashboardData?.kycStatus?.initiated || 0,
      color: "blue",
    },
    {
      label: "Under Process",
      value: dashboardData?.kycStatus?.underProcess || 0,
      color: "orange",
    },
    {
      label: "Registered",
      value: dashboardData?.kycStatus?.registered || 0,
      color: "green",
    },
    {
      label: "Validated",
      value: dashboardData?.kycStatus?.validated || 0,
      color: "purple",
    },
    { label: "Hold", value: dashboardData?.kycStatus?.hold || 0, color: "red" },
    {
      label: "Docs Pending",
      value: dashboardData?.kycStatus?.docsPending || 0,
      color: "yellow",
    },
  ];

  const panAndDataStatsItems = [
    {
      title: "PANs Solicited",
      subtitle: "With Image",
      count: dashboardData?.panStats?.solicited?.withImage || 0,
      color: "blue",
    },
    {
      title: "PANs Solicited",
      subtitle: "Without Image",
      count: dashboardData?.panStats?.solicited?.withoutImage || 0,
      color: "gray",
    },
    {
      title: "Data Received",
      subtitle: "With Image",
      count: dashboardData?.panStats?.dataReceived?.withImage || 0,
      color: "green",
    },
    {
      title: "Data Received",
      subtitle: "Without Image",
      count: dashboardData?.panStats?.dataReceived?.withoutImage || 0,
      color: "gray",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex">
        <div className="flex-1">
          <main className="px-6 py-3">
            {/* Header Controls */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  KYC Dashboard
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Tabs
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    onCustomDateChange={handleCustomDateChange}
                  />
                  <ViewTypeToggle
                    activeView={activeView}
                    onViewChange={handleViewChange}
                  />
                </div>
              </div>
            </div>

            {/* Total KYC Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {loading ? (
                <>
                  <LoadingSkeleton variant="card" />
                  <LoadingSkeleton variant="card" />
                </>
              ) : (
                <>
                  <KYCStatsCard
                    title="New KYC"
                    count={dashboardData?.totalKyc?.newKyc?.count || 0}
                    percentage={
                      dashboardData?.totalKyc?.newKyc?.percentageChange || 0
                    }
                    trend={dashboardData?.totalKyc?.newKyc?.trend || "up"}
                  />
                  <KYCStatsCard
                    title="Modified KYC"
                    count={dashboardData?.totalKyc?.modifiedKyc?.count || 0}
                    percentage={
                      dashboardData?.totalKyc?.modifiedKyc?.percentageChange ||
                      0
                    }
                    trend={
                      dashboardData?.totalKyc?.modifiedKyc?.trend || "down"
                    }
                  />
                </>
              )}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {loading ? (
                <>
                  <LoadingSkeleton variant="chart" />
                  <LoadingSkeleton variant="chart" />
                </>
              ) : (
                <>
                  <BarChartComponent
                    data={dashboardData?.chartData}
                    isDarkMode={isDarkMode}
                  />
                  <CircularChartComponent
                    data={dashboardData?.circularChartData}
                    isDarkMode={isDarkMode}
                  />
                </>
              )}
            </div>

            {/* KYC Status Cards */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                KYC Status Overview
              </h2>
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <LoadingSkeleton key={i} variant="card" className="h-24" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {kycStatusItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200"
                    >
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {item.label}
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {Math.round(item.value).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Categories & Stats Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Categories Progress */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Categories Progress
                </h3>
                {loading ? (
                  <div className="space-y-6">
                    {[...Array(4)].map((_, i) => (
                      <LoadingSkeleton key={i} variant="text" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Individual
                      </h4>
                      <div className="space-y-4">
                        <ProgressBar
                          label="RI"
                          current={
                            dashboardData?.categories?.individual?.ri
                              ?.current || 0
                          }
                          total={
                            dashboardData?.categories?.individual?.ri?.total ||
                            100
                          }
                          color="blue"
                        />
                        <ProgressBar
                          label="NRI"
                          current={
                            dashboardData?.categories?.individual?.nri
                              ?.current || 0
                          }
                          total={
                            dashboardData?.categories?.individual?.nri?.total ||
                            100
                          }
                          color="green"
                        />
                      </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Non-Individual
                      </h4>
                      <div className="space-y-4">
                        <ProgressBar
                          label="RI"
                          current={
                            dashboardData?.categories?.nonIndividual?.ri
                              ?.current || 0
                          }
                          total={
                            dashboardData?.categories?.nonIndividual?.ri
                              ?.total || 100
                          }
                          color="orange"
                        />
                        <ProgressBar
                          label="NRI"
                          current={
                            dashboardData?.categories?.nonIndividual?.nri
                              ?.current || 0
                          }
                          total={
                            dashboardData?.categories?.nonIndividual?.nri
                              ?.total || 100
                          }
                          color="purple"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PAN & Data Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  PAN & Data Statistics
                </h3>
                {loading ? (
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <LoadingSkeleton
                        key={i}
                        variant="card"
                        className="h-24"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {panAndDataStatsItems.map((item, index) => (
                      <KYCPanStatsCard
                        key={index}
                        title={item.title}
                        count={item.count}
                        subtitle={item.subtitle}
                        color={item.color}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}




// src/app/providers.jsx
// src/app/providers.jsx
"use client";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // block until hydration

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}




// src/app/rate-card/page.jsx
"use client";

import { useState, useEffect } from "react";
import {
  CurrencyDollarIcon,
  UserIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const rateCardData = {
  individual: {
    basic: {
      name: "Basic KYC",
      price: 15.0,
      description: "Standard individual KYC verification",
      features: [
        "Identity verification",
        "Address verification",
        "Basic document check",
        "24-48 hour processing",
        "Email support",
      ],
      processingTime: "24-48 hours",
      popular: false,
    },
    premium: {
      name: "Premium KYC",
      price: 25.0,
      description: "Enhanced individual KYC with additional checks",
      features: [
        "All Basic features",
        "Enhanced document verification",
        "Biometric verification",
        "Real-time processing",
        "Priority support",
        "Risk assessment",
      ],
      processingTime: "2-6 hours",
      popular: true,
    },
    enterprise: {
      name: "Enterprise KYC",
      price: 35.0,
      description: "Comprehensive individual KYC for enterprise clients",
      features: [
        "All Premium features",
        "Advanced fraud detection",
        "Custom compliance rules",
        "Dedicated account manager",
        "API integration",
        "Bulk processing discounts",
      ],
      processingTime: "1-2 hours",
      popular: false,
    },
  },
  nonIndividual: {
    basic: {
      name: "Basic Corporate KYC",
      price: 45.0,
      description: "Standard corporate entity verification",
      features: [
        "Company registration check",
        "Director verification",
        "Basic compliance screening",
        "48-72 hour processing",
        "Email support",
      ],
      processingTime: "48-72 hours",
      popular: false,
    },
    premium: {
      name: "Premium Corporate KYC",
      price: 75.0,
      description: "Enhanced corporate verification with UBO checks",
      features: [
        "All Basic features",
        "Ultimate Beneficial Owner (UBO) verification",
        "Enhanced due diligence",
        "Sanctions screening",
        "Priority support",
        "Ongoing monitoring",
      ],
      processingTime: "12-24 hours",
      popular: true,
    },
    enterprise: {
      name: "Enterprise Corporate KYC",
      price: 120.0,
      description: "Comprehensive corporate KYC for large enterprises",
      features: [
        "All Premium features",
        "Custom compliance frameworks",
        "Advanced risk scoring",
        "Real-time monitoring",
        "Dedicated compliance team",
        "White-label solutions",
      ],
      processingTime: "4-8 hours",
      popular: false,
    },
  },
};

const additionalServices = [
  {
    name: "Document Verification",
    price: 5.0,
    description: "Standalone document verification service",
    icon: DocumentTextIcon,
  },
  {
    name: "Address Verification",
    price: 8.0,
    description: "Independent address verification",
    icon: CheckCircleIcon,
  },
  {
    name: "Ongoing Monitoring",
    price: 12.0,
    description: "Continuous monitoring and alerts (per month)",
    icon: ClockIcon,
  },
  {
    name: "Rush Processing",
    price: 20.0,
    description: "Expedited processing (additional fee)",
    icon: ClockIcon,
  },
];

export default function RateCard() {
  const [activeCategory, setActiveCategory] = useState("individual");
  const currentRates = rateCardData[activeCategory];

  return (
    <div className="flex">
      <div className="flex-1">
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Rate Card
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Transparent pricing for all KYC services
            </p>
          </div>

          {/* Category Toggle */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 max-w-md">
              <button
                onClick={() => setActiveCategory("individual")}
                className={`
                    flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                    ${
                      activeCategory === "individual"
                        ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    }
                  `}
              >
                <UserIcon className="h-4 w-4" />
                <span>Individual</span>
              </button>
              <button
                onClick={() => setActiveCategory("nonIndividual")}
                className={`
                    flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                    ${
                      activeCategory === "nonIndividual"
                        ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    }
                  `}
              >
                <BuildingOfficeIcon className="h-4 w-4" />
                <span>Non-Individual</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Object.entries(currentRates).map(([key, plan]) => (
              <div
                key={key}
                className={`
                    relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border transition-all duration-200 hover:shadow-lg
                    ${
                      plan.popular
                        ? "border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 ring-opacity-20"
                        : "border-gray-200 dark:border-gray-700"
                    }
                  `}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        per verification
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Processing: {plan.processingTime}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`
                        w-full py-2 px-4 rounded-lg font-medium transition-all duration-200
                        ${
                          plan.popular
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                        }
                      `}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Additional Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {service.name}
                        </h3>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          ${service.price}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Volume Discounts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Volume Discounts
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Monthly Volume
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Discount
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Effective Rate (Individual Basic)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      1-100 verifications
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      0%
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                      $15.00
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      101-500 verifications
                    </td>
                    <td className="py-3 px-4 text-green-600 dark:text-green-400 font-medium">
                      5%
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                      $14.25
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      501-1000 verifications
                    </td>
                    <td className="py-3 px-4 text-green-600 dark:text-green-400 font-medium">
                      10%
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                      $13.50
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      1000+ verifications
                    </td>
                    <td className="py-3 px-4 text-green-600 dark:text-green-400 font-medium">
                      15%
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                      $12.75
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Note:</strong> Volume discounts are calculated monthly
                and applied automatically to your account. Enterprise customers
                may be eligible for custom pricing based on volume and
                requirements.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}




// src/app/notices/page.jsx
"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
  BellIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

const mockNotices = [
  {
    id: "NOT-001",
    title: "System Maintenance Scheduled",
    message:
      "Scheduled maintenance will occur on January 20, 2024, from 2:00 AM to 4:00 AM EST. KYC processing services will be temporarily unavailable during this time.",
    type: "warning",
    priority: "high",
    date: "2024-01-15",
    status: "active",
    category: "system",
  },
  {
    id: "NOT-002",
    title: "New Compliance Requirements",
    message:
      "Updated AML compliance requirements are now in effect. All corporate KYC verifications must include enhanced due diligence checks for entities from high-risk jurisdictions.",
    type: "info",
    priority: "high",
    date: "2024-01-14",
    status: "active",
    category: "compliance",
  },
  {
    id: "NOT-003",
    title: "Rate Card Update",
    message:
      "Our rate card has been updated with new pricing for premium services. Volume discounts have been increased for enterprise customers.",
    type: "success",
    priority: "medium",
    date: "2024-01-12",
    status: "active",
    category: "billing",
  },
  {
    id: "NOT-004",
    title: "API Version Deprecation",
    message:
      "API version 1.0 will be deprecated on March 1, 2024. Please upgrade to version 2.0 to ensure continued service. Migration guide available in documentation.",
    type: "warning",
    priority: "high",
    date: "2024-01-10",
    status: "active",
    category: "technical",
  },
  {
    id: "NOT-005",
    title: "Holiday Schedule",
    message:
      "PPY Technologies offices will be closed on January 15, 2024, for Martin Luther King Jr. Day. Automated processing will continue, but customer support will be limited.",
    type: "info",
    priority: "low",
    date: "2024-01-08",
    status: "archived",
    category: "general",
  },
  {
    id: "NOT-006",
    title: "Security Enhancement",
    message:
      "We have implemented additional security measures including two-factor authentication for all accounts. Please update your security settings.",
    type: "success",
    priority: "medium",
    date: "2024-01-05",
    status: "active",
    category: "security",
  },
  {
    id: "NOT-007",
    title: "Service Outage Resolved",
    message:
      "The service outage affecting document verification has been resolved. All pending verifications have been processed. We apologize for any inconvenience.",
    type: "error",
    priority: "high",
    date: "2024-01-03",
    status: "resolved",
    category: "system",
  },
];

const noticeTypes = {
  info: {
    icon: InformationCircleIcon,
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleColor: "text-blue-900 dark:text-blue-300",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    titleColor: "text-yellow-900 dark:text-yellow-300",
  },
  success: {
    icon: CheckCircleIcon,
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
    iconColor: "text-green-600 dark:text-green-400",
    titleColor: "text-green-900 dark:text-green-300",
  },
  error: {
    icon: XCircleIcon,
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
    titleColor: "text-red-900 dark:text-red-300",
  },
};

const priorityColors = {
  high: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  low: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
};

const statusColors = {
  active: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  resolved:
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
};

export default function Notices() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredNotices = mockNotices.filter((notice) => {
    const matchesType = filterType === "all" || notice.type === filterType;
    const matchesPriority =
      filterPriority === "all" || notice.priority === filterPriority;
    const matchesStatus =
      filterStatus === "all" || notice.status === filterStatus;

    return matchesType && matchesPriority && matchesStatus;
  });

  const getNoticeStats = () => {
    const active = mockNotices.filter((n) => n.status === "active").length;
    const high = mockNotices.filter((n) => n.priority === "high").length;
    const resolved = mockNotices.filter((n) => n.status === "resolved").length;

    return { active, high, resolved, total: mockNotices.length };
  };

  const stats = getNoticeStats();

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="flex">
        <div className="flex-1">
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Notices & Announcements
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Stay updated with important notices and system announcements
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <BellIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Notices
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.total}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Active
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.active}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      High Priority
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.high}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <XCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Resolved
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.resolved}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-2">
                  <FunnelIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Filters:
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="info">Information</option>
                    <option value="warning">Warning</option>
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                  </select>

                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="resolved">Resolved</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notices List */}
            <div className="space-y-4">
              {filteredNotices.map((notice) => {
                const typeConfig = noticeTypes[notice.type];
                const Icon = typeConfig.icon;

                return (
                  <div
                    key={notice.id}
                    className={`
                      ${typeConfig.bgColor} ${typeConfig.borderColor}
                      border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200
                    `}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${typeConfig.bgColor}`}>
                        <Icon className={`h-6 w-6 ${typeConfig.iconColor}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3
                            className={`text-lg font-semibold ${typeConfig.titleColor}`}
                          >
                            {notice.title}
                          </h3>
                          <div className="flex items-center space-x-2 ml-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[notice.priority]}`}
                            >
                              {notice.priority.charAt(0).toUpperCase() +
                                notice.priority.slice(1)}
                            </span>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[notice.status]}`}
                            >
                              {notice.status.charAt(0).toUpperCase() +
                                notice.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                          {notice.message}
                        </p>

                        <div className="flex items-center space-x-4 text-xs md:text-base text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4" />
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {notice?.date && !isNaN(new Date(notice.date))
                                ? new Date(notice.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )
                                : "N/A"}
                            </p>
                          </div>
                          <span className="capitalize">{notice.category}</span>
                          <span>ID: {notice.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredNotices.length === 0 && (
              <div className="text-center py-12">
                <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No notices found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your filters to see more notices.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}




// src/app/billing/page.jsx
"use client";

import { useState, useEffect } from "react";
import {
  CreditCardIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const mockBillingData = {
  currentBalance: 15750.0,
  monthlySpend: 3250.0,
  pendingCharges: 890.0,
  lastPayment: {
    amount: 2500.0,
    date: "2024-01-15",
    method: "Bank Transfer",
  },
};

const mockInvoices = [
  {
    id: "INV-2024-001",
    date: "2024-01-01",
    amount: 3250.0,
    status: "Paid",
    dueDate: "2024-01-15",
    services: "KYC Processing - December 2023",
  },
  {
    id: "INV-2023-012",
    date: "2023-12-01",
    amount: 2890.0,
    status: "Paid",
    dueDate: "2023-12-15",
    services: "KYC Processing - November 2023",
  },
  {
    id: "INV-2023-011",
    date: "2023-11-01",
    amount: 3100.0,
    status: "Paid",
    dueDate: "2023-11-15",
    services: "KYC Processing - October 2023",
  },
  {
    id: "INV-2023-010",
    date: "2023-10-01",
    amount: 2750.0,
    status: "Overdue",
    dueDate: "2023-10-15",
    services: "KYC Processing - September 2023",
  },
];

const mockTransactions = [
  {
    id: "TXN-001",
    date: "2024-01-16",
    description: "Individual KYC Processing",
    quantity: 125,
    unitPrice: 15.0,
    amount: 1875.0,
    type: "charge",
  },
  {
    id: "TXN-002",
    date: "2024-01-15",
    description: "Non-Individual KYC Processing",
    quantity: 45,
    unitPrice: 25.0,
    amount: 1125.0,
    type: "charge",
  },
  {
    id: "TXN-003",
    date: "2024-01-15",
    description: "Payment Received",
    quantity: 1,
    unitPrice: 2500.0,
    amount: -2500.0,
    type: "payment",
  },
  {
    id: "TXN-004",
    date: "2024-01-14",
    description: "Document Verification",
    quantity: 89,
    unitPrice: 5.0,
    amount: 445.0,
    type: "charge",
  },
];

const statusColors = {
  Paid: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  Overdue: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

export default function Billing() {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme");
  //   const prefersDark = window.matchMedia(
  //     "(prefers-color-scheme: dark)",
  //   ).matches;
  //
  //   if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  //     setIsDarkMode(true);
  //     document.documentElement.classList.add("dark");
  //   }
  // }, []);
  //
  // const toggleTheme = () => {
  //   const newMode = !isDarkMode;
  //   setIsDarkMode(newMode);
  //
  //   if (newMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="flex">
        <div className="flex-1">
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Billing & Payments
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your billing information and payment history
              </p>
            </div>

            {/* Billing Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <BanknotesIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Current Balance
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${mockBillingData.currentBalance.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <CreditCardIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Monthly Spend
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${mockBillingData.monthlySpend.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                    <DocumentTextIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Pending Charges
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${mockBillingData.pendingCharges.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <CalendarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Last Payment
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${mockBillingData.lastPayment.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {mockBillingData.lastPayment?.date
                        ? new Date(
                            mockBillingData.lastPayment.date,
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "invoices", label: "Invoices" },
                  { id: "transactions", label: "Transactions" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                      ${
                        activeTab === tab.id
                          ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payment Method */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Payment Method
                  </h3>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <CreditCardIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Bank Transfer
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Primary payment method
                      </p>
                    </div>
                  </div>
                  <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Update Payment Method
                  </button>
                </div>

                {/* Billing Address */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Billing Address
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>ABC Corporation</p>
                    <p>123 Business Street</p>
                    <p>Suite 100</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                  </div>
                  <button className="mt-4 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    Update Address
                  </button>
                </div>
              </div>
            )}

            {activeTab === "invoices" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Invoice ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {mockInvoices.map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {invoice.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(invoice.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            ${invoice.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[invoice.status]}`}
                            >
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                                <EyeIcon className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200">
                                <ArrowDownTrayIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Unit Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {mockTransactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(transaction.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {transaction.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {transaction.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            ${transaction.unitPrice.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <span
                              className={
                                transaction.type === "payment"
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-gray-900 dark:text-white"
                              }
                            >
                              {transaction.type === "payment" ? "-" : ""}$
                              {Math.abs(transaction.amount).toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}




// src/app/applications/page.jsx
"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const mockApplications = [
  {
    id: "KYC001",
    applicantName: "John Doe",
    type: "Individual",
    status: "Under Review",
    submittedDate: "2024-01-15",
    lastUpdated: "2024-01-16",
    documents: 4,
    priority: "High",
  },
  {
    id: "KYC002",
    applicantName: "ABC Corporation",
    type: "Non-Individual",
    status: "Approved",
    submittedDate: "2024-01-14",
    lastUpdated: "2024-01-15",
    documents: 6,
    priority: "Medium",
  },
  {
    id: "KYC003",
    applicantName: "Jane Smith",
    type: "Individual",
    status: "Pending Documents",
    submittedDate: "2024-01-13",
    lastUpdated: "2024-01-14",
    documents: 2,
    priority: "Low",
  },
  {
    id: "KYC004",
    applicantName: "XYZ Ltd",
    type: "Non-Individual",
    status: "Rejected",
    submittedDate: "2024-01-12",
    lastUpdated: "2024-01-13",
    documents: 5,
    priority: "High",
  },
  {
    id: "KYC005",
    applicantName: "Robert Johnson",
    type: "Individual",
    status: "In Progress",
    submittedDate: "2024-01-11",
    lastUpdated: "2024-01-12",
    documents: 3,
    priority: "Medium",
  },
];

const statusColors = {
  "Under Review":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  Approved:
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  "Pending Documents":
    "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  "In Progress":
    "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
};

const priorityColors = {
  High: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  Medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  Low: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
};

export default function Applications() {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme");
  //   const prefersDark = window.matchMedia(
  //     "(prefers-color-scheme: dark)",
  //   ).matches;
  //
  //   if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  //     setIsDarkMode(true);
  //     document.documentElement.classList.add("dark");
  //   }
  // }, []);
  //
  // const toggleTheme = () => {
  //   const newMode = !isDarkMode;
  //   setIsDarkMode(newMode);
  //
  //   if (newMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // };

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    const matchesType = typeFilter === "All" || app.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case "Rejected":
        return <XCircleIcon className="h-4 w-4 text-red-600" />;
      case "Under Review":
      case "In Progress":
        return <ClockIcon className="h-4 w-4 text-yellow-600" />;
      default:
        return <DocumentTextIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 min-h-screen transition-colors duration-300">
      <div className="flex">
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              KYC Applications
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and review KYC applications
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Applications
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    1,234
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Pending Review
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    89
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Approved
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    1,045
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <XCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Rejected
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    100
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending Documents">Pending Documents</option>
                  <option value="Rejected">Rejected</option>
                  <option value="In Progress">In Progress</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Types</option>
                  <option value="Individual">Individual</option>
                  <option value="Non-Individual">Non-Individual</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <FunnelIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredApplications.length} of {mockApplications.length}{" "}
                  applications
                </span>
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Application ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Documents
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredApplications.map((application) => (
                    <tr
                      key={application.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {application.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {application.applicantName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {application.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(application.status)}
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[application.status]}`}
                          >
                            {application.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[application.priority]}`}
                        >
                          {application.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {application.documents} files
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(application.lastUpdated).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




// src/app/agreement/page.jsx
"use client";

import { useState, useEffect } from "react";
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  ShareIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const agreementSections = [
  {
    id: "terms",
    title: "1. Terms and Conditions",
    content: `This KYC Service Agreement ("Agreement") is entered into between PPY Technologies ("Company", "we", "us") and the client ("Client", "you") for the provision of Know Your Customer (KYC) verification services.

By using our services, you agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our services.`,
  },
  {
    id: "services",
    title: "2. Services Provided",
    content: `PPY Technologies provides the following services:

• Individual KYC verification services
• Corporate/Non-Individual KYC verification services
• Document verification and authentication
• Identity verification and validation
• Address verification services
• Ongoing monitoring and compliance screening
• Risk assessment and scoring
• Regulatory compliance reporting

All services are provided in accordance with applicable laws and regulations, including but not limited to AML (Anti-Money Laundering) and CTF (Counter-Terrorism Financing) requirements.`,
  },
  {
    id: "obligations",
    title: "3. Client Obligations",
    content: `The Client agrees to:

• Provide accurate and complete information for all KYC requests
• Ensure all submitted documents are genuine and unaltered
• Comply with all applicable laws and regulations
• Maintain the confidentiality of login credentials and account information
• Pay all fees in accordance with the agreed rate card
• Notify PPY Technologies immediately of any suspected unauthorized access to their account
• Use the services only for legitimate business purposes
• Cooperate with any compliance or audit requirements`,
  },
  {
    id: "privacy",
    title: "4. Data Privacy and Security",
    content: `PPY Technologies is committed to protecting the privacy and security of all personal and business information:

• All data is encrypted in transit and at rest using industry-standard encryption
• Access to client data is restricted to authorized personnel only
• We comply with GDPR, CCPA, and other applicable data protection regulations
• Data retention policies are in accordance with regulatory requirements
• Regular security audits and penetration testing are conducted
• Incident response procedures are in place for any security breaches
• Client data will not be shared with third parties without explicit consent, except as required by law`,
  },
  {
    id: "liability",
    title: "5. Limitation of Liability",
    content: `To the maximum extent permitted by law:

• PPY Technologies's total liability shall not exceed the fees paid by the Client in the 12 months preceding the claim
• We are not liable for indirect, incidental, special, or consequential damages
• We do not guarantee the accuracy of third-party data sources
• Clients are responsible for their own compliance with applicable laws and regulations
• Force majeure events are excluded from liability
• This limitation applies regardless of the theory of liability`,
  },
  {
    id: "termination",
    title: "6. Termination",
    content: `This Agreement may be terminated:

• By either party with 30 days written notice
• Immediately by PPY Technologies in case of breach of terms
• Immediately by PPY Technologies if Client's account becomes delinquent
• Upon mutual agreement of both parties

Upon termination:
• All outstanding fees become immediately due
• Access to services will be suspended
• Data will be retained according to regulatory requirements
• Confidentiality obligations continue indefinitely`,
  },
  {
    id: "governing",
    title: "7. Governing Law",
    content: `This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising under this Agreement shall be resolved through binding arbitration in accordance with the rules of [Arbitration Body].

The parties agree to submit to the exclusive jurisdiction of the courts in [Jurisdiction] for any matters not subject to arbitration.`,
  },
];

export default function Agreement() {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("terms");

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme");
  //   const prefersDark = window.matchMedia(
  //     "(prefers-color-scheme: dark)",
  //   ).matches;
  //
  //   if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  //     setIsDarkMode(true);
  //     document.documentElement.classList.add("dark");
  //   }
  // }, []);
  //
  // const toggleTheme = () => {
  //   const newMode = !isDarkMode;
  //   setIsDarkMode(newMode);
  //
  //   if (newMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // };

  const handleDownload = () => {
    // In a real application, this would generate and download a PDF
    alert("Agreement download functionality would be implemented here");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "KYC Service Agreement",
        text: "PPY Technologies Service Agreement",
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Service Agreement
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            PPY Technologies Terms of Service and Agreement
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            <span className="lg:text-base text-xs">Download PDF</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <PrinterIcon className="h-4 w-4" />
            <span className="lg:text-base text-xs">Print</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <ShareIcon className="h-4 w-4" />
            <span className="lg:text-base text-xs">Share</span>
          </button>
        </div>
      </div>

      {/* Agreement Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <DocumentTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              KYC Service Agreement
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Version 2.1 • Effective Date: January 1, 2024
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Last Updated: January 1, 2024
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <DocumentTextIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              7 Sections
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              Current Version
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Table of Contents */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 top-24">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Table of Contents
            </h3>
            <nav className="space-y-2">
              {agreementSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                          w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200
                          ${
                            activeSection === section.id
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500"
                              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                          }
                        `}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Agreement Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {agreementSections.map((section) => (
              <div
                key={section.id}
                className={`
                        p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0
                        ${activeSection === section.id ? "block" : "hidden"}
                      `}
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  {section.content.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Agreement Footer */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Agreement Acceptance
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                By using PPY Technologies services, you acknowledge that you
                have read, understood, and agree to be bound by this Agreement.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  For questions about this agreement, contact:
                </span>
                <a
                  href="mailto:legal@ppytechnologies.com"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  legal@ppytechnologies.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




