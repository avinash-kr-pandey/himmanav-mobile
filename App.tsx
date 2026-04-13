// App.tsx
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

import { storage, initStorage } from "./src/utils/storage";
import SplashScreen from "./src/components/common/SplashScreen";
import { AuthProvider } from "./src/contexts/AuthContext";
import { ThemeProvider } from "./src/components/ThemeProvider";
import { useTheme } from "./src/hooks/useTheme";
import { store } from "./store";
import AppNavigator from "./src/components/navigation/AppNavigator";

// Inner component to use theme
function AppContent() {
  const { colors, statusBarStyle, headerColor } = useTheme();

  return (
    <>
      <StatusBar
        style={statusBarStyle as "light" | "dark"}
        backgroundColor={headerColor}
      />
      <AuthProvider>
        <AppNavigator /> 
      </AuthProvider>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await initStorage();
        await storage.removeItem("NAVIGATION_STATE");
        await storage.removeItem("NAVIGATION_STATE_KEY");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error preparing app:", error);
      } finally {
        setIsReady(true);
        setIsLoading(false);
      }
    };

    prepareApp();
  }, []);

  if (!isReady || isLoading) {
    return <SplashScreen onFinish={() => {}} />;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
