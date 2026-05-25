import { FiFilter } from 'react-icons/fi';

const GENRES = [
  'All Genres',
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

const GenreFilter = ({ value, onChange }) => {
  return (
    <div className="relative flex items-center">
      <div className="absolute left-3 pointer-events-none">
        <FiFilter className="w-4 h-4 text-gray-400" />
      </div>
      <select
        id="genre-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input pl-9 pr-4 cursor-pointer min-w-[160px]"
        aria-label="Filter books by genre"
      >
        {GENRES.map((genre) => (
          <option key={genre} value={genre === 'All Genres' ? '' : genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
