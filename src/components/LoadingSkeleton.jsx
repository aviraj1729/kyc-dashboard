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