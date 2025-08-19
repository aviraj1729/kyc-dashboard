"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
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
} from "recharts";
import { useLocalStorageTheme } from "../hooks/useLocalStorageTheme";

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
  let daysInPeriod = 7;
  let chartDataDates = [];
  const today = new Date();

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
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    chartDataDates = daysOfWeek.map((day) => new Date());
  }

  const baseMultiplier = Math.max(1, daysInPeriod * 0.5);
  const randomValue = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const newKycCount = randomValue(100, 500) * baseMultiplier;
  const modifiedKycCount = randomValue(20, 100) * baseMultiplier;
  const trendNewKyc = Math.random() > 0.5 ? "up" : "down";
  const trendModifiedKyc = Math.random() > 0.5 ? "up" : "down";

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

  const colorByName = useCallback(() => {
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
                    colorByName().get(entry.name) ??
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
          </PieChart>
        </ResponsiveContainer>
      </div>
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
                style={{ backgroundColor: colorByName().get(name) }}
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
            {tab.id === "custom" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h.01M8 11h.01M12 11h.01M16 11h.01M7 15h.01M11 15h.01M15 15h.01M8 19h.01M12 19h.01M16 19h.01M4 21h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            )}
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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("today");
  const [activeView, setActiveView] = useState("individual");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customDate, setCustomDate] = useState("");
  const { isDarkMode, mounted } = useLocalStorageTheme();

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
  // ✅ Hooks must always run
  useEffect(() => {
    if (!mounted) return; // safe check, but don’t skip hook
    setLoading(true);
    const timer = setTimeout(() => {
      setDashboardData(generateMockDataForRange(activeTab, customDate));
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [activeTab, activeView, customDate, mounted]);

  // ✅ Conditional rendering moved here
  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex">
        <div className="flex-1">
          <main className="px-6 py-3">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
