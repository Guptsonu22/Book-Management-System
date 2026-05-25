import { FiBookOpen, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <FiBookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Book<span className="text-primary-600">Shelf</span>
            </span>
          </div>

          {/* Center tagline */}
          <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            Built with
            <FiHeart className="w-3 h-3 text-red-400 fill-red-400" />
            using
            <span className="font-medium text-gray-500 dark:text-gray-400">React</span>
            +
            <span className="font-medium text-gray-500 dark:text-gray-400">Vite</span>
            +
            <span className="font-medium text-gray-500 dark:text-gray-400">Tailwind CSS</span>
          </p>

          {/* Right — tech badges */}
          <div className="flex items-center gap-2">
            <span className="badge bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 text-xs">
              React 18
            </span>
            <span className="badge bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 text-xs">
              JSON Server
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-600">
              © {year}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
