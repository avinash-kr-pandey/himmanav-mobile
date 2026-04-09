import { Platform, Alert, PermissionsAndroid } from 'react-native';
import { Alert as RNAlert } from 'react-native';

// Mock FCM Token - Static for now
const MOCK_FCM_TOKEN = 'mock-fcm-token-' + Math.random().toString(36).substring(2, 15);

// Request permission for notifications (static mock)
export const requestUserPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    // Mock iOS permission
    console.log('iOS: Mock notification permission granted');
    return true;
  }
  
  if (Platform.OS === 'android') {
    // Mock Android permission
    if (Platform.Version >= 33) {
      // Just mock the permission for now
      console.log('Android: Mock notification permission granted');
      return true;
    }
    return true;
  }
  
  return true;
};

// Get FCM token (returns mock token)
export const getFCMToken = async (): Promise<string | null> => {
  try {
    // Return static mock token
    console.log('Mock FCM Token:', MOCK_FCM_TOKEN);
    
    // Store token locally (optional)
    // await AsyncStorage.setItem('fcmToken', MOCK_FCM_TOKEN);
    
    return MOCK_FCM_TOKEN;
  } catch (error) {
    console.error('Error getting mock token:', error);
    return null;
  }
};

// Request for token (web version जैसा same function)
export const requestForToken = async (): Promise<string | null> => {
  try {
    // Mock permission request
    const permissionGranted = await requestUserPermission();
    
    if (!permissionGranted) {
      console.log('Mock notification permission not granted');
      return null;
    }
    
    // Return mock token
    const token = await getFCMToken();
    return token;
  } catch (error) {
    console.error('Error in requestForToken:', error);
    return null;
  }
};

// Mock message listener
export const onMessageListener = () => {
  // Return dummy unsubscribe function
  return () => {
    console.log('Mock message listener unsubscribed');
  };
};

// Mock background message handler
export const onBackgroundMessageListener = () => {
  console.log('Mock background message handler set');
};

// Initialize notifications (mock)
export const initializeNotifications = async () => {
  try {
    console.log('Initializing mock notifications...');
    const token = await getFCMToken();
    console.log('Mock FCM Token:', token);
    
    // Set up mock background handler
    onBackgroundMessageListener();
    
    return token;
  } catch (error) {
    console.error('Error initializing mock notifications:', error);
    return null;
  }
};

// Register device token (mock - no backend call)
export const registerDeviceToken = async (
  userId: string,
  token: string,
  deviceType: string = Platform.OS
): Promise<boolean> => {
  try {
    // Just log - no actual API call
    console.log('Mock device registration:', {
      user_id: userId,
      fcm_token: token,
      device_type: deviceType,
      timestamp: new Date().toISOString(),
    });
    
    // Store in AsyncStorage if needed
    // await AsyncStorage.setItem('registeredToken', token);
    
    return true;
  } catch (error) {
    console.error('Error in mock registration:', error);
    return false;
  }
};

// Delete device token (mock)
export const deleteDeviceToken = async (token: string): Promise<boolean> => {
  try {
    console.log('Mock device token deleted:', token);
    // await AsyncStorage.removeItem('registeredToken');
    return true;
  } catch (error) {
    console.error('Error in mock deletion:', error);
    return false;
  }
};

// Get device ID (mock)
export const getDeviceId = async (): Promise<string> => {
  try {
    // Return mock device ID
    return 'mock-device-id-' + Math.random().toString(36).substring(2, 10);
  } catch (error) {
    console.error('Error getting mock device ID:', error);
    return 'unknown-device';
  }
};

// Show local notification (mock)
export const showLocalNotification = (title: string, body: string) => {
  // Show alert for demo
  RNAlert.alert(title, body);
  console.log('Mock notification shown:', { title, body });
};

// Schedule notification (mock)
export const scheduleNotification = async (
  title: string,
  body: string,
  delaySeconds: number = 0
) => {
  setTimeout(() => {
    showLocalNotification(title, body);
  }, delaySeconds * 1000);
  
  console.log('Mock notification scheduled:', { title, body, delaySeconds });
};

// Get all registered tokens (mock)
export const getAllTokens = async (): Promise<string[]> => {
  return [MOCK_FCM_TOKEN];
};