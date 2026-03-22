import { loginApi, signupApi, verifyOtpApi } from "../api/authApi";
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
    if (error.response.status === 409) {
      throw "Email already exists";
    }
    throw error.response?.data?.message || "Signup failed";
  }
};

export const verifyOtpService = async (data) => {
  try {
    const res = await verifyOtpApi(data);
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Verification failed";
  }
};