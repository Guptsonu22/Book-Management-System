import { useState } from 'react';
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
  Fiction: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Sci-Fi': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Education: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Biography: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Mystery: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Fantasy: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  History: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Romance: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  Technology: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  Other: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400',
};

const BookCard = ({ book, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const badgeColor = GENRE_COLORS[book.genre] || GENRE_COLORS['Other'];

  return (
    <article
      className={`card overflow-hidden group transition-all duration-300 ${
        isHovered ? 'shadow-lg shadow-primary-500/10 -translate-y-1 border-primary-200 dark:border-primary-800' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Book: ${book.title}`}
    >
      {/* Card top accent */}
      <div className="h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600" />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white truncate leading-tight">
              {book.title}
            </h2>
            <div className="flex items-center gap-1.5 mt-1 text-gray-500 dark:text-gray-400 text-sm">
              <FiUser className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{book.author}</span>
            </div>
          </div>
          <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <FiBookOpen className="w-5 h-5 text-primary-500" />
          </div>
        </div>

        {/* Genre & Year */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className={`badge ${badgeColor}`}>
            <FiTag className="w-3 h-3 mr-1" />
            {book.genre || 'Unknown'}
          </span>
          <span className="badge bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <FiCalendar className="w-3 h-3 mr-1" />
            {book.year || 'N/A'}
          </span>
        </div>

        {/* Description */}
        {book.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
            {book.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          <Link
            to={`/edit/${book.id}`}
            id={`edit-book-${book.id}`}
            className="btn-secondary flex-1 text-center text-xs py-2"
            aria-label={`Edit ${book.title}`}
          >
            <FiEdit2 className="w-3.5 h-3.5" />
            Edit
          </Link>
          <button
            id={`delete-book-${book.id}`}
            onClick={() => onDelete(book)}
            className="btn-danger flex-1 text-xs py-2"
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
