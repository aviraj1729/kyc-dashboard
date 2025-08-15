import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

export default function KYCStatsCard({ title, count, percentage, trend, className = "" }) {
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';
  const bgColor = trend === 'up' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20';
  const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{count.toLocaleString()}</p>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${bgColor}`}>
          <TrendIcon className={`h-3 w-3 ${trendColor}`} />
          <span className={`text-xs font-medium ${trendColor}`}>
            {Math.abs(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
}