import { useEffect, useState } from "react";
import {
  initializeNotifications,
  onMessageListener,
  getFCMToken,
  showLocalNotification,
  scheduleNotification,
} from "../utils/notifications";

export const useNotifications = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  useEffect(() => {
    const setupNotifications = async () => {
      // Initialize mock notifications
      const token = await initializeNotifications();
      setFcmToken(token);
      setPermissionGranted(true);

      // Listen for mock messages (for demo)
      const unsubscribe = onMessageListener();

      return unsubscribe;
    };

    setupNotifications();
  }, []);

  const refreshToken = async () => {
    const token = await getFCMToken();
    setFcmToken(token);
    return token;
  };

  const sendTestNotification = () => {
    showLocalNotification(
      "Test Notification",
      "This is a test notification from your app!",
    );
  };

  const scheduleTestNotification = (seconds: number = 5) => {
    scheduleNotification(
      "Scheduled Notification",
      `This notification was scheduled ${seconds} seconds ago`,
      seconds,
    );
  };

  return {
    fcmToken,
    permissionGranted,
    refreshToken,
    sendTestNotification,
    scheduleTestNotification,
  };
};
