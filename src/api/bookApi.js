import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const searchBooksApi = (query) => API.get(`/books?q=${query}`);
export const getBookDetailsApi = (id) => API.get(`/books/${id}`);
export const getBookSummaryApi = (payload) => API.post(`/books/summary`, payload);
