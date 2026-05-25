import { Link, useLocation } from 'react-router-dom';
import { FiBookOpen, FiPlus, FiSun, FiMoon } from 'react-icons/fi';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            id="navbar-logo"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform duration-200">
              <FiBookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                Book<span className="text-primary-600">Shelf</span>
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">
                Book Management System
              </p>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Add Book Button */}
            <Link
              to="/add"
              id="navbar-add-book"
              className={`btn-primary hidden sm:inline-flex ${
                location.pathname === '/add'
                  ? 'opacity-80 cursor-default pointer-events-none'
                  : ''
              }`}
            >
              <FiPlus className="w-4 h-4" />
              Add Book
            </Link>

            {/* Mobile add button */}
            <Link
              to="/add"
              id="navbar-add-book-mobile"
              className="sm:hidden btn-primary p-2.5"
              aria-label="Add book"
            >
              <FiPlus className="w-5 h-5" />
            </Link>

            {/* Dark Mode Toggle */}
            <button
              id="dark-mode-toggle"
              onClick={toggleDarkMode}
              className="btn-ghost w-10 p-0 rounded-xl"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <FiSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-600" />
              )}
            </button>


          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
