// src/components/navigation/AppNavigator.tsx
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Text,
} from "react-native";

import { useAuth } from "../../contexts/AuthContext";
import { colors } from "../../constants/colors";

// Import Components
import AppHeader from "../common/AppHeader";
import SidebarModal from "../common/SidebarModal";
import { getBottomTabs, TabItem } from "../../constants/tab&sidebar/data";
import Homepage from "../../app/(tabs)/home";
import AboutScreen from "../../app/(tabs)/about";
import ContactScreen from "../../app/(tabs)/contact";
import ProfileScreen from "../../app/(tabs)/profile";
import SettingsScreen from "../../app/(tabs)/settings";
import LoginScreen from "../../app/(auth)/login";
import RegisterScreen from "../../app/(auth)/register";
import ForgotPasswordScreen from "../../app/(auth)/forgot-password";

// Import Screens


export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Map screen names to components
const getScreenComponent = (screenName: string) => {
  const screens: Record<string, any> = {
    Home: Homepage,
    About: AboutScreen,
    Contact: ContactScreen,
    Profile: ProfileScreen,
    Settings: SettingsScreen,
  };

  const Component = screens[screenName];

  if (!Component) {
    return () => (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Screen "{screenName}" not found</Text>
      </View>
    );
  }

  return Component;
};

// Dynamic Bottom Tab Navigator
function DynamicBottomTabs() {
  const { user } = useAuth();
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTabs();
  }, [user?.user_type]);

  const loadTabs = () => {
    setLoading(true);
    const tabItems = getBottomTabs(user?.user_type || "employee");
    setTabs(tabItems);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.tabLoadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary || "#6366F1",
        tabBarInactiveTintColor: "#9CA3AF",
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.id}
          name={tab.screen}
          component={getScreenComponent(tab.screen)}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: 12,
                  color: focused ? colors.primary : "#9CA3AF",
                  marginTop: 4,
                }}
              >
                {tab.title}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Text
                style={{
                  fontSize: 24,
                  color: focused ? colors.primary : "#9CA3AF",
                }}
              >
                {tab.icon}
              </Text>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

// Main App Component with Header and Bottom Tabs
function MainApp() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Himmanav"
          showMenu={true}
          showProfile={true}
          onMenuPress={() => setIsSidebarVisible(true)}
          onProfilePress={() => {}}
        />

        <View style={styles.content}>
          <DynamicBottomTabs />
        </View>

        <SidebarModal
          visible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const AppNavigator: React.FC = () => {
  const { user, isLoading, authChecked } = useAuth();

  if (!authChecked || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary || "#6366F1"} />
      </View>
    );
  }

  const isAuthenticated = !!user;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="MainApp" component={MainApp} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  tabLoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
  },
});

// ✅ IMPORTANT: Add default export here
export default AppNavigator;
