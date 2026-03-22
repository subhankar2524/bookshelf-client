import { searchBooksApi } from "../api/bookApi";

export const searchBooksService = async (query) => {
  try {
    const res = await searchBooksApi(query);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Search failed";
  }
};
