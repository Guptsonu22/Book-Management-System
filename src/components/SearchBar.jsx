import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative flex-1 min-w-0">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <FiSearch className="w-4 h-4 text-gray-400" />
      </div>
      <input
        id="search-books"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title or author..."
        className="input pl-10 pr-10"
        aria-label="Search books by title or author"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          id="clear-search"
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Clear search"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
