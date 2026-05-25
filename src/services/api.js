import axios from 'axios';

// API base URL — uses env var (local json-server on port 3001 by default)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Normalize error messages from API responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

const isProduction = import.meta.env.PROD || window.location.hostname !== 'localhost';

// ─── LocalStorage Mock Database for Vercel ───────────────────────────────
const getDb = () => {
  const data = localStorage.getItem('books_db');
  if (data) return JSON.parse(data);
  // Default seed data for the assignment
  const seed = [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', year: 1925, description: 'A story of the fabulously wealthy Jay Gatsby.' },
    { id: '2', title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', year: 1965, description: 'Set on the desert planet Arrakis.' },
    { id: '3', title: 'The Pragmatic Programmer', author: 'Andrew Hunt', genre: 'Education', year: 1999, description: 'Your journey to mastery in software development.' },
    { id: '4', title: 'Steve Jobs', author: 'Walter Isaacson', genre: 'Biography', year: 2011, description: 'The exclusive biography of Steve Jobs.' }
  ];
  localStorage.setItem('books_db', JSON.stringify(seed));
  return seed;
};

const saveDb = (data) => localStorage.setItem('books_db', JSON.stringify(data));
const delay = (ms = 600) => new Promise((res) => setTimeout(res, ms)); // Simulate network latency

// ─── Book API Methods ──────────────────────────────────────────────────────

/** Fetch all books */
export const getBooks = async () => {
  if (isProduction) {
    await delay();
    return getDb();
  }
  const response = await api.get('/books');
  return response.data;
};

/** Fetch a single book by ID */
export const getBookById = async (id) => {
  if (isProduction) {
    await delay();
    const book = getDb().find(b => String(b.id) === String(id));
    if (!book) throw new Error('Book not found');
    return book;
  }
  const response = await api.get(`/books/${id}`);
  return response.data;
};

/** Create a new book */
export const createBook = async (bookData) => {
  if (isProduction) {
    await delay();
    const db = getDb();
    const newBook = { ...bookData, id: Date.now().toString() };
    saveDb([...db, newBook]);
    return newBook;
  }
  const response = await api.post('/books', bookData);
  return response.data;
};

/** Update an existing book */
export const updateBook = async (id, bookData) => {
  if (isProduction) {
    await delay();
    const db = getDb();
    const index = db.findIndex(b => String(b.id) === String(id));
    if (index === -1) throw new Error('Book not found');
    db[index] = { ...bookData, id };
    saveDb(db);
    return db[index];
  }
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

/** Delete a book by ID */
export const deleteBook = async (id) => {
  if (isProduction) {
    await delay();
    const db = getDb();
    saveDb(db.filter(b => String(b.id) !== String(id)));
    return {};
  }
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export default api;
