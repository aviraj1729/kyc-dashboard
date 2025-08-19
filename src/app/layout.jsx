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
