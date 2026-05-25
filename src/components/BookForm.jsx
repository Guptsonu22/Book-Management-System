import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiX, FiBook, FiUser, FiTag, FiCalendar, FiFileText } from 'react-icons/fi';
import Spinner from './Spinner';

const GENRES = [
  'Fiction',
  'Sci-Fi',
  'Education',
  'Biography',
  'Mystery',
  'Fantasy',
  'History',
  'Romance',
  'Technology',
  'Other',
];

const INITIAL_FORM = {
  title: '',
  author: '',
  genre: '',
  year: '',
  description: '',
};

const BookForm = ({ initialData, onSubmit, loading, isEdit = false }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Pre-fill form if editing
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        author: initialData.author || '',
        genre: initialData.genre || '',
        year: initialData.year?.toString() || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  // ─── Validation ─────────────────────────────────────────────────────────
  const validate = (values) => {
    const errs = {};
    if (!values.title.trim()) errs.title = 'Title is required';
    else if (values.title.trim().length < 2) errs.title = 'Title must be at least 2 characters';

    if (!values.author.trim()) errs.author = 'Author is required';
    else if (values.author.trim().length < 2) errs.author = 'Author must be at least 2 characters';

    if (!values.genre) errs.genre = 'Genre is required';

    if (!values.year) {
      errs.year = 'Publication year is required';
    } else if (!/^\d{4}$/.test(values.year)) {
      errs.year = 'Year must be a 4-digit number';
    } else {
      const y = parseInt(values.year, 10);
      if (y < 1000 || y > new Date().getFullYear() + 5) {
        errs.year = `Year must be between 1000 and ${new Date().getFullYear() + 5}`;
      }
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all as touched
    const allTouched = Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    const errs = validate(form);
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    await onSubmit(form);
  };

  const handleCancel = () => navigate('/');

  const getFieldClass = (name) =>
    `input ${errors[name] && touched[name] ? 'border-red-400 focus:ring-red-400 dark:border-red-600' : ''}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" id="book-form">
      {/* Title */}
      <div>
        <label htmlFor="title" className="label">
          <span className="flex items-center gap-1.5">
            <FiBook className="w-4 h-4 text-primary-500" />
            Book Title <span className="text-red-500">*</span>
          </span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. The Great Gatsby"
          className={getFieldClass('title')}
          disabled={loading}
          maxLength={200}
        />
        {errors.title && touched.title && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1" role="alert">
            <FiX className="w-3 h-3" /> {errors.title}
          </p>
        )}
      </div>

      {/* Author */}
      <div>
        <label htmlFor="author" className="label">
          <span className="flex items-center gap-1.5">
            <FiUser className="w-4 h-4 text-primary-500" />
            Author <span className="text-red-500">*</span>
          </span>
        </label>
        <input
          id="author"
          name="author"
          type="text"
          value={form.author}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. F. Scott Fitzgerald"
          className={getFieldClass('author')}
          disabled={loading}
          maxLength={100}
        />
        {errors.author && touched.author && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1" role="alert">
            <FiX className="w-3 h-3" /> {errors.author}
          </p>
        )}
      </div>

      {/* Genre & Year — side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Genre */}
        <div>
          <label htmlFor="genre" className="label">
            <span className="flex items-center gap-1.5">
              <FiTag className="w-4 h-4 text-primary-500" />
              Genre <span className="text-red-500">*</span>
            </span>
          </label>
          <select
            id="genre"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${getFieldClass('genre')} cursor-pointer`}
            disabled={loading}
          >
            <option value="">Select a genre</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genre && touched.genre && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1" role="alert">
              <FiX className="w-3 h-3" /> {errors.genre}
            </p>
          )}
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="label">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="w-4 h-4 text-primary-500" />
              Publication Year <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            id="year"
            name="year"
            type="number"
            value={form.year}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. 2024"
            min="1000"
            max={new Date().getFullYear() + 5}
            className={getFieldClass('year')}
            disabled={loading}
          />
          {errors.year && touched.year && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1" role="alert">
              <FiX className="w-3 h-3" /> {errors.year}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="label">
          <span className="flex items-center gap-1.5">
            <FiFileText className="w-4 h-4 text-primary-500" />
            Description <span className="text-gray-400 font-normal text-xs ml-1">(optional)</span>
          </span>
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Brief summary or description of the book..."
          className="input resize-none"
          rows={3}
          disabled={loading}
          maxLength={500}
        />
        <p className="mt-1 text-xs text-gray-400 text-right">
          {form.description.length}/500
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          id="submit-book-form"
          className="btn-primary flex-1"
          disabled={loading}
        >
          {loading ? (
            <Spinner size="sm" />
          ) : (
            <FiSave className="w-4 h-4" />
          )}
          {loading ? 'Saving...' : isEdit ? 'Update Book' : 'Add Book'}
        </button>
        <button
          type="button"
          id="cancel-book-form"
          onClick={handleCancel}
          className="btn-secondary flex-1"
          disabled={loading}
        >
          <FiX className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookForm;
