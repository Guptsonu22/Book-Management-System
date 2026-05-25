import { Link } from 'react-router-dom';
import {
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiUser,
  FiTag,
  FiBookOpen,
} from 'react-icons/fi';

// Genre badge colors
const GENRE_COLORS = {
  Fiction:     'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  'Sci-Fi':    'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  Education:   'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  Biography:   'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
  Mystery:     'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
  Fantasy:     'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
  History:     'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  Romance:     'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
  Technology:  'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400',
  Other:       'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const BookCard = ({ book, onDelete }) => {
  const badgeColor = GENRE_COLORS[book.genre] || GENRE_COLORS['Other'];

  return (
    <article
      className="
        flex flex-col bg-white dark:bg-gray-900 rounded-2xl
        border border-gray-100 dark:border-gray-800
        shadow-sm overflow-hidden
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10
        hover:border-primary-200 dark:hover:border-primary-800
        group
      "
      aria-label={`Book: ${book.title}`}
    >
      {/* Animated top accent */}
      <div className="h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600
                      group-hover:from-primary-500 group-hover:via-purple-500 group-hover:to-pink-500
                      transition-all duration-500" />

      <div className="flex flex-col flex-1 p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white
                           line-clamp-2 leading-snug
                           group-hover:text-primary-600 dark:group-hover:text-primary-400
                           transition-colors duration-200">
              {book.title}
            </h2>
            <div className="flex items-center gap-1.5 mt-1.5 text-gray-500 dark:text-gray-400 text-sm">
              <FiUser className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{book.author}</span>
            </div>
          </div>

          {/* Book icon — scales on hover */}
          <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-xl
                          flex items-center justify-center flex-shrink-0
                          group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40
                          group-hover:scale-110 transition-all duration-300">
            <FiBookOpen className="w-5 h-5 text-primary-500" />
          </div>
        </div>

        {/* Genre & Year badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`badge ${badgeColor}`}>
            <FiTag className="w-3 h-3 mr-1" />
            {book.genre || 'Unknown'}
          </span>
          <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <FiCalendar className="w-3 h-3 mr-1" />
            {book.year || 'N/A'}
          </span>
        </div>

        {/* Description — fixed 3 lines */}
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed flex-1 mb-4 min-h-[3.75rem]">
          {book.description || 'No description available for this book.'}
        </p>

        {/* Actions — pinned to bottom */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800 mt-auto">
          <Link
            to={`/edit/${book.id}`}
            id={`edit-book-${book.id}`}
            className="btn-secondary flex-1 text-center text-xs
                       hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200
                       dark:hover:bg-primary-900/20 dark:hover:text-primary-400 dark:hover:border-primary-800"
            aria-label={`Edit ${book.title}`}
          >
            <FiEdit2 className="w-3.5 h-3.5" />
            Edit
          </Link>
          <button
            id={`delete-book-${book.id}`}
            onClick={() => onDelete(book)}
            className="btn-danger flex-1 text-xs
                       hover:bg-red-600 active:scale-95"
            aria-label={`Delete ${book.title}`}
          >
            <FiTrash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
