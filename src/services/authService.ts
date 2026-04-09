// services/auth.service.ts
import api from "./api";
import { storage, AUTH_TOKEN_KEY, USER_DATA_KEY } from "../utils/storage";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  mobile_number: string;
  email?: string;
  password: string;
  password_confirmation: string;
}

class AuthService {
  // ✅ Login API - yahan sirf endpoint call karna hai
  async login(credentials: LoginCredentials) {
    try {
      const response = await api.post("/auth/login", credentials);
      const { user, token } = response.data;

      // Store token and user
      await storage.setItem(AUTH_TOKEN_KEY, token);
      await storage.setItem(USER_DATA_KEY, user);

      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }

  // ✅ Register API
  async register(credentials: RegisterCredentials) {
    try {
      const response = await api.post("/auth/register", credentials);
      const { user, token } = response.data;

      // Auto-login after registration
      await storage.setItem(AUTH_TOKEN_KEY, token);
      await storage.setItem(USER_DATA_KEY, user);

      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  }

  // ✅ Forgot Password API
  async forgotPassword(email: string) {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to send reset link",
      );
    }
  }

  // ✅ Reset Password API
  async resetPassword(
    token: string,
    password: string,
    passwordConfirmation: string,
  ) {
    try {
      const response = await api.post("/auth/reset-password", {
        token,
        password,
        password_confirmation: passwordConfirmation,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to reset password",
      );
    }
  }

  // ✅ Logout API
  async logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      await storage.removeItem(AUTH_TOKEN_KEY);
      await storage.removeItem(USER_DATA_KEY);
    }
  }

  // ✅ Get Current User
  async getCurrentUser() {
    try {
      const user = await storage.getItem(USER_DATA_KEY);
      return user;
    } catch (error) {
      return null;
    }
  }
}

export default new AuthService();
