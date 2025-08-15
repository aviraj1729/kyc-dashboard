"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import KYCStatsCard from "../components/KYCStatsCard";
import BarChart from "../components/BarChart";
import CircularChart from "../components/CircularChart";
import ProgressBar from "../components/ProgressBar";
import Tabs from "../components/Tabs";
import ViewTypeToggle from "../components/ViewTypeToggle";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  const [activeView, setActiveView] = useState("individual");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customDate, setCustomDate] = useState("");

  // Theme management
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

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          timeframe: activeTab,
          viewType: activeView,
          ...(customDate && { customDate }),
        });

        const response = await fetch(`/api/dashboard-data?${params}`);
        const result = await response.json();

        if (result.success) {
          setDashboardData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar
            onThemeToggle={toggleTheme}
            isDarkMode={isDarkMode}
            page={"dashboard"}
          />

          <main className="px-6 py-3">
            {/* Header Controls */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  KYC Dashboard
                </h1>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
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
                  <BarChart
                    data={dashboardData?.chartData}
                    isDarkMode={isDarkMode}
                  />
                  <CircularChart
                    data={dashboardData?.solicitation}
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
                        {item.value.toLocaleString()}
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
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <LoadingSkeleton key={i} variant="text" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        PANs Solicited
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {dashboardData?.panStats?.solicited?.withImage?.toLocaleString() ||
                              0}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            With Image
                          </p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                            {dashboardData?.panStats?.solicited?.withoutImage?.toLocaleString() ||
                              0}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Without Image
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Data Received
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {dashboardData?.panStats?.dataReceived?.withImage?.toLocaleString() ||
                              0}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            With Image
                          </p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                            {dashboardData?.panStats?.dataReceived?.withoutImage?.toLocaleString() ||
                              0}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Without Image
                          </p>
                        </div>
                      </div>
                    </div>
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
