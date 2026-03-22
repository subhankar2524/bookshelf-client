import { getBookmarksApi, createBookmarkApi, deleteBookmarkApi } from "../api/userActionApi";

export const getBookmarksService = async () => {
  try {
    const res = await getBookmarksApi();
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to fetch bookmarks";
  }
};

export const createBookmarkService = async (data) => {
  try {
    const res = await createBookmarkApi(data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to create bookmark";
  }
};

export const deleteBookmarkService = async (id) => {
  try {
    const res = await deleteBookmarkApi(id);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to delete bookmark";
  }
};
