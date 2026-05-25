import { Link } from 'react-router-dom';
import { FiBookOpen, FiPlus, FiSearch } from 'react-icons/fi';

const EmptyState = ({ searchQuery, genreFilter, onClearFilters }) => {
  const hasFilters = searchQuery || genreFilter;

  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in"
      id="empty-state"
      aria-live="polite"
    >
      {/* Illustration */}
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-primary-50 dark:bg-primary-900/20 rounded-3xl flex items-center justify-center">
          {hasFilters ? (
            <FiSearch className="w-10 h-10 text-primary-400" />
          ) : (
            <FiBookOpen className="w-10 h-10 text-primary-400" />
          )}
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
          {hasFilters ? '?' : '!'}
        </div>
      </div>

      {/* Text */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {hasFilters ? 'No books found' : 'No books yet'}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed mb-6">
        {hasFilters ? (
          <>
            No books match
            {searchQuery && (
              <> &ldquo;<span className="font-medium text-gray-700 dark:text-gray-300">{searchQuery}</span>&rdquo;</>
            )}
            {searchQuery && genreFilter && ' in '}
            {genreFilter && (
              <> the <span className="font-medium text-gray-700 dark:text-gray-300">{genreFilter}</span> genre</>
            )}.
            Try adjusting your search or filters.
          </>
        ) : (
          'Your library is empty. Start building your collection by adding your first book!'
        )}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {hasFilters && (
          <button
            id="clear-filters-btn"
            onClick={onClearFilters}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        )}
        <Link to="/add" id="empty-add-book" className="btn-primary">
          <FiPlus className="w-4 h-4" />
          Add a Book
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
