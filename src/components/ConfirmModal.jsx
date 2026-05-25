import { useEffect } from 'react';
import { FiAlertTriangle, FiTrash2, FiX } from 'react-icons/fi';

const ConfirmModal = ({ isOpen, book, onConfirm, onCancel, loading }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onCancel();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onCancel]);

  if (!isOpen || !book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md card p-6 animate-bounce-in shadow-2xl">
        {/* Close button */}
        <button
          id="modal-close"
          onClick={onCancel}
          className="absolute top-4 right-4 btn-ghost p-1.5 rounded-lg"
          aria-label="Close"
          disabled={loading}
        >
          <FiX className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 bg-red-100 dark:bg-red-900/20 rounded-2xl mx-auto mb-4">
          <FiAlertTriangle className="w-7 h-7 text-red-500" />
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h2
            id="confirm-modal-title"
            className="text-lg font-bold text-gray-900 dark:text-white mb-2"
          >
            Delete Book?
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              &ldquo;{book.title}&rdquo;
            </span>{' '}
            by {book.author}? This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            id="modal-cancel"
            onClick={onCancel}
            className="btn-secondary flex-1"
            disabled={loading}
          >
            Keep it
          </button>
          <button
            id="modal-confirm-delete"
            onClick={onConfirm}
            className="btn-danger flex-1"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Deleting...
              </span>
            ) : (
              <>
                <FiTrash2 className="w-4 h-4" />
                Yes, Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
