"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("individual");

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

  const currentRates = rateCardData[activeCategory];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar
            onThemeToggle={toggleTheme}
            isDarkMode={isDarkMode}
            page={"rate-card"}
          />

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
                  and applied automatically to your account. Enterprise
                  customers may be eligible for custom pricing based on volume
                  and requirements.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

