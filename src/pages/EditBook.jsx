import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiEdit2 } from 'react-icons/fi';
import BookForm from '../components/BookForm';
import { getBookById, updateBook } from '../services/api';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  // Page title
  useEffect(() => {
    document.title = 'Edit Book — BookShelf';
    return () => { document.title = 'My Library — BookShelf'; };
  }, []);

  // Update title once book is loaded
  useEffect(() => {
    if (book?.title) {
      document.title = `Edit "${book.title}" — BookShelf`;
    }
  }, [book]);

  // Fetch book data
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        setFetchError(err.message);
        toast.error(`Failed to load book: ${err.message}`);
      } finally {
        setFetchLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSaveLoading(true);
    try {
      await updateBook(id, {
        ...formData,
        year: parseInt(formData.year, 10),
      });
      toast.success('✏️ Book updated successfully!');
      navigate('/');
    } catch (err) {
      toast.error(`Failed to update book: ${err.message}`);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <button
          id="back-to-home"
          onClick={() => navigate('/')}
          className="btn-ghost text-sm -ml-2"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Library
        </button>
      </nav>

      {/* Loading */}
      {fetchLoading && (
        <div className="card p-16 flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <Spinner size="lg" />
            <div className="absolute inset-0 rounded-full bg-primary-500/10 animate-ping" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Loading book details…
          </p>
        </div>
      )}

      {/* Error */}
      {fetchError && !fetchLoading && (
        <div className="card p-10 text-center" role="alert">
          <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 rounded-2xl
                          flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-red-500 font-medium mb-1">Failed to load book</p>
          <p className="text-sm text-gray-500 mb-5">{fetchError}</p>
          <button
            id="retry-load-book"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Go back to Library
          </button>
        </div>
      )}

      {/* Form card */}
      {!fetchLoading && !fetchError && book && (
        <div className="card overflow-hidden animate-in">
          <div className="h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-primary-600" />

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-600
                              rounded-xl flex items-center justify-center
                              shadow-lg shadow-orange-500/30">
                <FiEdit2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Edit Book
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {book.title}
                </p>
              </div>
            </div>

            <BookForm
              initialData={book}
              onSubmit={handleSubmit}
              loading={saveLoading}
              isEdit={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBook;
