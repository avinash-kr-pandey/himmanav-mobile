export const config = {
  // API URL - Change this to your actual API endpoint
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com',
  
  // App Configuration
  appName: 'Himmanav Mobile',
  version: '1.0.0',
  
  // Splash Screen
  splashScreenDuration: 2000,
  
  // Timeouts
  apiTimeout: 10000,
  
  // Pagination
  itemsPerPage: 10,
  
  // Features
  enableAnalytics: false,
  enablePushNotifications: false,
  
  // Storage Keys
  storageKeys: {
    authToken: '@auth_token',
    userData: '@user_data',
    settings: '@app_settings',
  },
} as const;

export type ConfigType = typeof config;