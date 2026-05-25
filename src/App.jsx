import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

const App = () => {
  // Dark mode state with localStorage persistence
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center py-32 gap-4 text-center px-4">
                  <div className="text-6xl font-black text-gray-200 dark:text-gray-800">404</div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Page not found</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The page you&apos;re looking for doesn&apos;t exist.
                  </p>
                  <a href="/" className="btn-primary mt-2">
                    Go Home
                  </a>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Toast Container */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme={darkMode ? 'dark' : 'light'}
          toastClassName="text-sm font-medium"
          id="toast-container"
        />
      </div>
    </Router>
  );
};

export default App;
