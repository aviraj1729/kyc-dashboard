'use client';

export default function ViewTypeToggle({ activeView, onViewChange }) {
  const views = [
    { id: 'individual', label: 'Individual' },
    { id: 'nonIndividual', label: 'Non-Individual' },
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => onViewChange(view.id)}
          className={`
            px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
            ${activeView === view.id
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
            }
          `}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}