import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { storage } from './src/utils/storage';
import SplashScreen from './src/components/common/SplashScreen';
import { colors } from './src/constants/colors';
import { AuthProvider } from './src/contexts/AuthContext';
import RootNavigator from './src/components/navigation/AppNavigator';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Clear any corrupted navigation state
        await storage.removeItem('NAVIGATION_STATE');
        await storage.removeItem('NAVIGATION_STATE_KEY');
      } catch (error) {
        console.error('Error clearing navigation state:', error);
      }
      setIsReady(true);
    };
    
    prepareApp();
  }, []);

  if (!isReady || isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor={colors.background} />
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}