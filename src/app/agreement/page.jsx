"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("terms");

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar
            onThemeToggle={toggleTheme}
            isDarkMode={isDarkMode}
            page={"agreement"}
          />

          <main className="p-6">
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
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
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <PrinterIcon className="h-4 w-4" />
                    <span>Print</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <ShareIcon className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
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
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
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
                        {section.content
                          .split("\n\n")
                          .map((paragraph, index) => (
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
                      By using PPY Technologies services, you acknowledge that
                      you have read, understood, and agree to be bound by this
                      Agreement.
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
          </main>
        </div>
      </div>
    </div>
  );
}

