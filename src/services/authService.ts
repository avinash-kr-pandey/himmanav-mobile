import api from './api';
import { storage, AUTH_TOKEN_KEY, USER_DATA_KEY } from '../utils/storage';
import { User, LoginCredentials, RegisterCredentials } from '../types/user.types';

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, token } = response.data;
      
      await storage.setItem(AUTH_TOKEN_KEY, token);
      await storage.setItem(USER_DATA_KEY, user);
      
      return user;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }
  
  async register(credentials: RegisterCredentials): Promise<User> {
    try {
      const response = await api.post('/auth/register', credentials);
      const { user, token } = response.data;
      
      await storage.setItem(AUTH_TOKEN_KEY, token);
      await storage.setItem(USER_DATA_KEY, user);
      
      return user;
    } catch (error: any) {
      console.error('Register error:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }
  
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      await storage.removeItem(AUTH_TOKEN_KEY);
      await storage.removeItem(USER_DATA_KEY);
    }
  }
  
  async getCurrentUser(): Promise<User | null> {
    try {
      return await storage.getItem<User>(USER_DATA_KEY);
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }
  
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await storage.getItem<string>(AUTH_TOKEN_KEY);
      // ✅ Ensure boolean return
      return token !== null && token !== undefined && token.length > 0;
    } catch (error) {
      console.error('Is authenticated error:', error);
      return false;
    }
  }
}

export default new AuthService();