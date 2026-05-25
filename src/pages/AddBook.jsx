import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiBookOpen } from 'react-icons/fi';
import BookForm from '../components/BookForm';
import { createBook } from '../services/api';
import { toast } from 'react-toastify';

const AddBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Page title
  useEffect(() => {
    document.title = 'Add Book — BookShelf';
    return () => { document.title = 'My Library — BookShelf'; };
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createBook({
        ...formData,
        year: parseInt(formData.year, 10),
      });
      toast.success('📚 Book added successfully!');
      navigate('/');
    } catch (err) {
      toast.error(`Failed to add book: ${err.message}`);
    } finally {
      setLoading(false);
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

      {/* Card */}
      <div className="card overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600" />

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700
                            rounded-xl flex items-center justify-center
                            shadow-lg shadow-primary-500/30">
              <FiBookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Add New Book
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Fill in the details to add a book to your library
              </p>
            </div>
          </div>

          {/* Form */}
          <BookForm onSubmit={handleSubmit} loading={loading} isEdit={false} />
        </div>
      </div>

      {/* Tips card */}
      <div className="mt-4 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/10
                      border border-primary-100 dark:border-primary-900/30">
        <p className="text-xs text-primary-700 dark:text-primary-400 font-medium mb-1">
          💡 Pro Tip
        </p>
        <p className="text-xs text-primary-600 dark:text-primary-500">
          All fields marked with <span className="text-red-500">*</span> are required.
          You can optionally add a description to help remember key details about the book.
        </p>
      </div>
    </div>
  );
};

export default AddBook;
