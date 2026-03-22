import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const searchBooksApi = (query) => API.get(`/books?q=${query}`);
export const getBookDetailsApi = (id) => API.get(`/books/${id}`);
export const getBookSummaryApi = (payload) => API.post(`/books/summary`, payload);
