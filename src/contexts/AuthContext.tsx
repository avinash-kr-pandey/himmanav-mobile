// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
} from "../../store/authApi";
import { setTheme } from "../../store/slices/theme/themeSlice";

interface User {
  id: number;
  name: string;
  email: string;
  number?: string;
  phone?: string;
  user_type: string;
  profile_image?: string | null;
  uid?: string;
  email_verified_at?: string | null;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  authChecked: boolean;
  setUser: (user: User | null) => void;
  login: (credentials: { number: string; password: string }) => Promise<any>;
  register: (userData: RegisterData) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  mobile_number: string;
  email?: string;
  password: string;
  password_confirmation: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // API mutations
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token");
      const userData = await AsyncStorage.getItem("user_data");
      console.log("🔍 Loading user - Token exists:", !!token);
      console.log("🔍 Loading user - UserData exists:", !!userData);

      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        console.log("✅ User loaded:", parsedUser?.email);
        setUser(parsedUser);
      } else {
        console.log("❌ No user found, will show login screen");
        setUser(null);
      }
    } catch (error) {
      console.error("Error loading user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
      setAuthChecked(true);
    }
  };

  const login = async (credentials: { number: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await loginMutation(credentials).unwrap();

      if (response?.access_token) {
        await AsyncStorage.setItem("auth_token", response.access_token);
        if (response.user) {
          await AsyncStorage.setItem(
            "user_data",
            JSON.stringify(response.user),
          );
          setUser(response.user);
        }
      }

      return response;
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await registerMutation(userData).unwrap();
      return response;
    } catch (error: any) {
      console.error("Register error:", error);
      throw new Error(error?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await forgotPasswordMutation({ email }).unwrap();
      return response;
    } catch (error: any) {
      console.error("Forgot password error:", error);
      throw new Error(error?.data?.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      await AsyncStorage.removeItem("auth_token");
      await AsyncStorage.removeItem("user_data");
      setUser(null);
      dispatch(setTheme("light"));
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      AsyncStorage.setItem("user_data", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        authChecked,
        setUser,
        login,
        register,
        forgotPassword,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
