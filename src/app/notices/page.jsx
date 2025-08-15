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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar
            onThemeToggle={toggleTheme}
            isDarkMode={isDarkMode}
            page={"notices"}
          />

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

                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                              {new Date(notice.date).toLocaleDateString()}
                            </span>
                          </div>
                          <span>•</span>
                          <span className="capitalize">{notice.category}</span>
                          <span>•</span>
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

