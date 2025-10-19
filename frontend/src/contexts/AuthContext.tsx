"use client";
import { User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  setUser: (u: User | null) => void;
  logoutUser: () => void;
}>({
  user: null,
  loading: true,
  setUser: () => {},
  logoutUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await axios.get(`${API_BASE}/api/profile`, {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (err) {
        console.log(err)
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const logoutUser = async () => {
    try {
      await axios.post(
        `${API_BASE}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
