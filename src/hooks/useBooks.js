import { useState, useEffect, useCallback } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from '../services/api';
import { toast } from 'react-toastify';

/**
 * Custom hook for managing books state and API operations
 */
const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ─── Fetch all books ────────────────────────────────────────────────────
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError(err.message);
      toast.error(`Failed to fetch books: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // ─── Add a new book ─────────────────────────────────────────────────────
  const addBook = async (bookData) => {
    setLoading(true);
    try {
      const newBook = await createBook({
        ...bookData,
        year: parseInt(bookData.year, 10),
      });
      setBooks((prev) => [newBook, ...prev]);
      toast.success('📚 Book added successfully!');
      return { success: true };
    } catch (err) {
      toast.error(`Failed to add book: ${err.message}`);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ─── Update an existing book ────────────────────────────────────────────
  const editBook = async (id, bookData) => {
    setLoading(true);
    try {
      const updated = await updateBook(id, {
        ...bookData,
        year: parseInt(bookData.year, 10),
      });
      setBooks((prev) =>
        prev.map((book) => (book.id === id ? updated : book))
      );
      toast.success('✏️ Book updated successfully!');
      return { success: true };
    } catch (err) {
      toast.error(`Failed to update book: ${err.message}`);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ─── Delete a book ──────────────────────────────────────────────────────
  const removeBook = async (id) => {
    setLoading(true);
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
      toast.success('🗑️ Book deleted successfully!');
      return { success: true };
    } catch (err) {
      toast.error(`Failed to delete book: ${err.message}`);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    editBook,
    removeBook,
  };
};

export default useBooks;
