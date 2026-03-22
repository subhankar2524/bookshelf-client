import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// LOGIN
export const loginApi = (data) => API.post("/auth/login", data);

// SIGNUP
export const signupApi = (data) => API.post("/auth/signup", data);

// VERIFY OTP
export const verifyOtpApi = (data) => API.post("/auth/verify", data);