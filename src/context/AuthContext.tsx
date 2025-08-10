import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "AUTHAPP_USERS";
const CURRENT_USER_KEY = "AUTHAPP_CURRENT_USER";

/**
 * NOTE:
 * For this demo we store user records (email + password) in AsyncStorage.
 */

type StoredUser = { name: string; email: string; password: string };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // restore session
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(CURRENT_USER_KEY);
        if (raw) {
          setUser(JSON.parse(raw));
        }
      } catch (e) {
        console.warn("Failed to restore user", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const rawUsers = await AsyncStorage.getItem(USERS_KEY);
      const users: StoredUser[] = rawUsers ? JSON.parse(rawUsers) : [];

      const matched = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!matched) {
        return { ok: false, message: "Incorrect credentials" };
      }

      const loggedIn: User = { name: matched.name, email: matched.email };
      setUser(loggedIn);
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedIn));
      return { ok: true };
    } catch (e) {
      console.error("Login error", e);
      return { ok: false, message: "Unexpected error" };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const rawUsers = await AsyncStorage.getItem(USERS_KEY);
      const users: StoredUser[] = rawUsers ? JSON.parse(rawUsers) : [];

      const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return { ok: false, message: "Email already exists" };
      }

      const newUser: StoredUser = { name, email, password };
      users.push(newUser);
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

      const loggedIn: User = { name, email };
      setUser(loggedIn);
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedIn));

      return { ok: true };
    } catch (e) {
      console.error("Signup error", e);
      return { ok: false, message: "Unexpected error" };
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
