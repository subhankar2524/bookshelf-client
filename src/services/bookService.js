import { searchBooksApi, getBookDetailsApi, getBookSummaryApi } from "../api/bookApi";

export const searchBooksService = async (query) => {
  try {
    const res = await searchBooksApi(query);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Search failed";
  }
};

export const getBookDetailsService = async (id) => {
  try {
    const res = await getBookDetailsApi(id);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch book detail";
  }
};

export const getBookSummaryService = async (payload) => {
  try {
    const res = await getBookSummaryApi(payload);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to generate summary";
  }
};
