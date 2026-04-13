// store/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TAG_TYPES } from "../src/types/tagTypes";

// ✅ Use environment variable instead of hardcoded URL
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://api.himmanav.com/api/v1/";

// Add null check for AsyncStorage
const getToken = async (): Promise<string | null> => {
  try {
    // Check if AsyncStorage is available
    if (!AsyncStorage) {
      console.warn("AsyncStorage is not available");
      return null;
    }
    return await AsyncStorage.getItem("auth_token");
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await getToken();

      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: TAG_TYPES,
  endpoints: () => ({}),
});
