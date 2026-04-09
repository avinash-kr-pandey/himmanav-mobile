// constants/config.ts
export const config = {
  // API URL
  apiUrl: process.env.EXPO_PUBLIC_API_URL || "https://api.example.com",

  // ✅ Add this property
  useMockApi: process.env.EXPO_PUBLIC_USE_MOCK_API === "true" || true, // Default true for now

  // App Configuration
  appName: "Himmanav Mobile",
  version: "1.0.0",

  // Splash Screen
  splashScreenDuration: 2000,

  // Timeouts
  apiTimeout: 30000,

  // Pagination
  itemsPerPage: 10,

  // Features
  enableAnalytics: false,
  enablePushNotifications: false,

  // Storage Keys
  storageKeys: {
    authToken: "@auth_token",
    userData: "@user_data",
    settings: "@app_settings",
  },
} as const;

export type ConfigType = typeof config;
