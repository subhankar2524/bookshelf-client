import { useState, useEffect } from "react";
import { getUser, clearAuthData } from "../utils/storage";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    clearAuthData();
    setUser(null);
    window.location.href = "/login";
  };

  return { user, loading, logout };
};
