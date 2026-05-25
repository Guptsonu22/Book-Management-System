import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiBook, FiRefreshCw } from 'react-icons/fi';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import EmptyState from '../components/EmptyState';
import ConfirmModal from '../components/ConfirmModal';
import { FullPageSpinner } from '../components/Spinner';
import useBooks from '../hooks/useBooks';

const Home = () => {
  const { books, loading, error, fetchBooks, removeBook } = useBooks();
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ─── Filtered books ──────────────────────────────────────────────────────
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        !search ||
        book.title?.toLowerCase().includes(search.toLowerCase()) ||
        book.author?.toLowerCase().includes(search.toLowerCase());

      const matchesGenre = !genreFilter || book.genre === genreFilter;

      return matchesSearch && matchesGenre;
    });
  }, [books, search, genreFilter]);

  const handleDeleteClick = (book) => setDeleteTarget(book);
  const handleCancelDelete = () => setDeleteTarget(null);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    await removeBook(deleteTarget.id);
    setDeleteLoading(false);
    setDeleteTarget(null);
  };

  const handleClearFilters = () => {
    setSearch('');
    setGenreFilter('');
  };

  return (
    <>
      {/* Full page loading on initial fetch */}
      {loading && books.length === 0 && <FullPageSpinner />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <FiBook className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Library
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
              </p>
            </div>
          </div>
        </header>

        {/* Error state */}
        {error && (
          <div
            className="card p-4 mb-6 border-l-4 border-red-400 bg-red-50 dark:bg-red-900/10 flex items-center justify-between gap-4"
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

        {/* Controls */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchBar value={search} onChange={setSearch} />
            <GenreFilter value={genreFilter} onChange={setGenreFilter} />
            <Link
              to="/add"
              id="home-add-book"
              className="btn-primary sm:flex-shrink-0"
            >
              <FiPlus className="w-4 h-4" />
              Add Book
            </Link>
          </div>

          {/* Active filter pills */}
          {(search || genreFilter) && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex-wrap">
              <span className="text-xs text-gray-500 dark:text-gray-400">Active filters:</span>
              {search && (
                <span className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 gap-1">
                  Search: &ldquo;{search}&rdquo;
                </span>
              )}
              {genreFilter && (
                <span className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                  Genre: {genreFilter}
                </span>
              )}
              <span className="text-xs text-gray-400">
                Showing {filteredBooks.length} of {books.length}
              </span>
            </div>
          )}
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <EmptyState
            searchQuery={search}
            genreFilter={genreFilter}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            id="books-grid"
            aria-label="Books collection"
          >
            {filteredBooks.map((book) => (
              <div key={book.id} className="animate-in">
                <BookCard book={book} onDelete={handleDeleteClick} />
              </div>
            ))}
          </div>
        )}

        {/* Loading overlay when refreshing */}
        {loading && books.length > 0 && (
          <div className="fixed bottom-6 right-6 card px-4 py-3 flex items-center gap-2.5 shadow-lg z-40">
            <div className="w-4 h-4 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Updating...</span>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
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
