import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // change if needed
});

// LOGIN
export const loginApi = (data) => API.post("/auth/login", data);

// SIGNUP
export const signupApi = (data) => API.post("/auth/signup", data);

// VERIFY (optional - depends on your backend)
export const verifyApi = () => API.get("/auth/verify");