// services/api.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { storage, AUTH_TOKEN_KEY, USER_DATA_KEY } from "../utils/storage";
import { config } from "../constants/config";
import { mockApi } from "./mockApi.service";

// ✅ Create real API instance
const realApi = axios.create({
  baseURL: config.apiUrl,
  timeout: config.apiTimeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for real API
realApi.interceptors.request.use(
  async (config) => {
    const token = await storage.getItem<string>(AUTH_TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for real API
realApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await storage.removeItem(AUTH_TOKEN_KEY);
      await storage.removeItem(USER_DATA_KEY);
    }
    return Promise.reject(error);
  },
);

// ✅ Create mock API wrapper that matches axios interface
class MockApiWrapper {
  async post(url: string, data?: any, config?: any) {
    try {
      const response = await mockApi.post(url, data, config);
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  async get(url: string, config?: any) {
    try {
      const response = await mockApi.get(url, config);
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  async put(url: string, data?: any, config?: any) {
    try {
      const response = await mockApi.put(url, data, config);
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  async delete(url: string, config?: any) {
    try {
      const response = await mockApi.delete(url, config);
      return response;
    } catch (error: any) {
      throw error;
    }
  }
}

// ✅ Export either real or mock API based on config
const api = config.useMockApi ? new MockApiWrapper() : realApi;

export default api;
