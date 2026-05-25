import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiBook, FiRefreshCw } from 'react-icons/fi';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import EmptyState from '../components/EmptyState';
import ConfirmModal from '../components/ConfirmModal';
import { SkeletonGrid } from '../components/SkeletonCard';
import useBooks from '../hooks/useBooks';
import useDebounce from '../hooks/useDebounce';

const Home = () => {
  const { books, loading, error, fetchBooks, removeBook } = useBooks();

  // Raw search input (updates instantly for UI responsiveness)
  const [searchInput, setSearchInput] = useState('');
  // Debounced value (used for actual filtering — 400ms delay)
  const debouncedSearch = useDebounce(searchInput, 400);

  const [genreFilter, setGenreFilter] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = 'My Library — BookShelf';
  }, []);

  // ─── Filtered books (uses debounced search value) ────────────────────────
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const q = debouncedSearch.toLowerCase();
      const matchesSearch =
        !q ||
        book.title?.toLowerCase().includes(q) ||
        book.author?.toLowerCase().includes(q);
      const matchesGenre = !genreFilter || book.genre === genreFilter;
      return matchesSearch && matchesGenre;
    });
  }, [books, debouncedSearch, genreFilter]);

  const isSearching = searchInput !== debouncedSearch;

  const handleDeleteClick  = (book) => setDeleteTarget(book);
  const handleCancelDelete = () => setDeleteTarget(null);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    await removeBook(deleteTarget.id);
    setDeleteLoading(false);
    setDeleteTarget(null);
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setGenreFilter('');
  };

  const isInitialLoad = loading && books.length === 0;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Hero Header ─────────────────────────────────────────── */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700
                              rounded-xl flex items-center justify-center
                              shadow-lg shadow-primary-500/30">
                <FiBook className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  My Library
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isInitialLoad
                    ? 'Loading your collection…'
                    : `${books.length} ${books.length === 1 ? 'book' : 'books'} in your collection`}
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* ── Error Banner ─────────────────────────────────────────── */}
        {error && (
          <div
            className="card p-4 mb-6 border-l-4 border-red-400 bg-red-50 dark:bg-red-900/10
                       flex items-center justify-between gap-4 animate-in"
            role="alert"
            id="error-banner"
          >
            <div>
              <p className="font-medium text-red-700 dark:text-red-400 text-sm">
                Failed to load books
              </p>
              <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">{error}</p>
            </div>
            <button
              id="retry-fetch"
              onClick={fetchBooks}
              className="btn-secondary text-xs py-1.5 flex-shrink-0"
            >
              <FiRefreshCw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        )}

        {/* ── Controls ─────────────────────────────────────────────── */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              isSearching={isSearching}
            />
            <GenreFilter value={genreFilter} onChange={setGenreFilter} />
            <Link to="/add" id="home-add-book" className="btn-primary sm:flex-shrink-0">
              <FiPlus className="w-4 h-4" />
              Add Book
            </Link>
          </div>

          {/* Active filter pills */}
          {(debouncedSearch || genreFilter) && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex-wrap">
              <span className="text-xs text-gray-500 dark:text-gray-400">Active filters:</span>
              {debouncedSearch && (
                <span className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 gap-1">
                  Search: &ldquo;{debouncedSearch}&rdquo;
                </span>
              )}
              {genreFilter && (
                <span className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                  Genre: {genreFilter}
                </span>
              )}
              <span className="text-xs text-gray-400">
                {isSearching ? 'Searching…' : `Showing ${filteredBooks.length} of ${books.length}`}
              </span>
            </div>
          )}
        </div>

        {/* ── Skeleton Loading (initial fetch) ─────────────────────── */}
        {isInitialLoad && <SkeletonGrid count={8} />}

        {/* ── Empty State ──────────────────────────────────────────── */}
        {!isInitialLoad && filteredBooks.length === 0 && !error && (
          <EmptyState
            searchQuery={debouncedSearch}
            genreFilter={genreFilter}
            onClearFilters={handleClearFilters}
          />
        )}

        {/* ── Books Grid ───────────────────────────────────────────── */}
        {!isInitialLoad && filteredBooks.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            id="books-grid"
            aria-label="Books collection"
          >
            {filteredBooks.map((book, i) => (
              <div
                key={book.id}
                className="animate-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <BookCard book={book} onDelete={handleDeleteClick} />
              </div>
            ))}
          </div>
        )}

        {/* ── Subtle refreshing indicator (not initial load) ────────── */}
        {loading && books.length > 0 && (
          <div className="fixed bottom-6 right-6 card px-4 py-3 flex items-center gap-2.5 shadow-xl z-40 animate-in">
            <div className="w-4 h-4 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Updating…</span>
          </div>
        )}
      </div>

      {/* ── Delete Confirmation Modal ─────────────────────────────── */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        book={deleteTarget}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={deleteLoading}
      />
    </>
  );
};

export default Home;
