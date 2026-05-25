import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

const App = () => {
  // Dark mode — persisted in localStorage, respects system preference
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-gradient-to-b dark:from-[#020617] dark:to-[#000814]">
        {/* Sticky top navbar */}
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Page content */}
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/add"     element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center py-32 gap-4 text-center px-4">
                  <div className="text-7xl font-black text-gray-200 dark:text-gray-800 select-none">
                    404
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Page not found
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                    The page you&apos;re looking for doesn&apos;t exist or was moved.
                  </p>
                  <a href="/" className="btn-primary mt-2">
                    Go to My Library
                  </a>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Toast notifications */}
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
