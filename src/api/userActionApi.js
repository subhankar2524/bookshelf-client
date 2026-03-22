import axios from "axios";
import { getToken } from "../utils/storage";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getBookmarksApi = () => API.get("/user-actions/bookmarks");
export const createBookmarkApi = (data) => API.post("/user-actions", data);
export const deleteBookmarkApi = (id) => API.delete(`/user-actions/${id}`);
