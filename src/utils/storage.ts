import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTH_TOKEN_KEY = '@auth_token';
export const USER_DATA_KEY = '@user_data';
export const NAVIGATION_STATE_KEY = '@navigation_state';

class StorageService {
  private static instance: StorageService;
  
  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }
  
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
  
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      return null;
    }
  }
  
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  }
  
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }
  
  // Special method for boolean values
  async setBoolean(key: string, value: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving boolean:', error);
    }
  }
  
  async getBoolean(key: string): Promise<boolean | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading boolean:', error);
      return null;
    }
  }
}

export const storage = StorageService.getInstance();