import axios from 'axios';

// MockAPI base URL — update this with your own MockAPI project URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://6839b3f26561b8d882f76b1a.mockapi.io/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error normalization
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

// ─── Book API Methods ──────────────────────────────────────────────────────

/**
 * Fetch all books
 */
export const getBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

/**
 * Fetch a single book by ID
 */
export const getBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

/**
 * Create a new book
 */
export const createBook = async (bookData) => {
  const response = await api.post('/books', bookData);
  return response.data;
};

/**
 * Update an existing book
 */
export const updateBook = async (id, bookData) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

/**
 * Delete a book by ID
 */
export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export default api;
