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

