import { useState } from "react";
import { searchBooksService } from "../services/bookService";

export const useBooks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  const searchBooks = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const res = await searchBooksService(query);
      setBooks(res);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { searchBooks, books, loading, error };
};
