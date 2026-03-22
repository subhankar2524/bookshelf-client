import { useState } from "react";
import { getBookmarksService, createBookmarkService, deleteBookmarkService } from "../services/userActionService";

export const useUserActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  const getBookmarks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBookmarksService();
      setBookmarks(data);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createBookmark = async (bookData) => {
    try {
      setLoading(true);
      setError(null);
      await createBookmarkService(bookData);
      await getBookmarks(); // Refresh bookmarks list
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBookmark = async (bookmarkId) => {
    try {
      setLoading(true);
      setError(null);
      await deleteBookmarkService(bookmarkId);
      await getBookmarks(); // Refresh bookmarks list
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
    bookmarks,
    loading,
    error,
  };
};
