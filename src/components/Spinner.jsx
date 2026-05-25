const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`${sizes[size]} border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin ${className}`}
    />
  );
};

export const FullPageSpinner = () => (
  <div
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 dark:bg-gray-950/60 backdrop-blur-sm"
    role="status"
    aria-label="Loading content"
  >
    <Spinner size="lg" />
    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
      Loading...
    </p>
  </div>
);

export default Spinner;
