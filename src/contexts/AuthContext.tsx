import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types/user.types';
import authService from '../services/authService';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = await authService.getCurrentUser();
      const token = await authService.isAuthenticated();
      
      setState({
        user,
        isAuthenticated: !!token,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Auth check error:', error);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  };

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = await authService.login({ email, password });
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Login failed',
      }));
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = await authService.register({ name, email, password, confirmPassword: password });
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Registration failed',
      }));
      throw error;
    }
  };

  const logout = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}