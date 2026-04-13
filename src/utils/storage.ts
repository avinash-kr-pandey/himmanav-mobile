// src/utils/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

// Verify AsyncStorage is working
export const initStorage = async (): Promise<boolean> => {
  try {
    console.log("Initializing storage...");
    // Test AsyncStorage
    await AsyncStorage.setItem("@test", "test");
    const result = await AsyncStorage.getItem("@test");
    await AsyncStorage.removeItem("@test");
    console.log("✅ Storage initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Storage initialization failed:", error);
    return false;
  }
};

export const storage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  },
  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};
