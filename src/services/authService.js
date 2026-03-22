import { loginApi, signupApi } from "../api/authApi";
import { setAuthData } from "../utils/storage";

export const loginService = async (data) => {
  try {
    const res = await loginApi(data);

    // assuming backend returns { token, user }
    setAuthData(res.data);

    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const signupService = async (data) => {
  try {
    const res = await signupApi(data);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Signup failed";
  }
};