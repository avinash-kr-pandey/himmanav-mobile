// components/ThemeProvider.tsx
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadTheme } from "../../store/slices/theme/themeSlice";
import { Theme } from "../../store/slices/theme/themeConfig";


interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    try {
      const savedTheme = (await AsyncStorage.getItem("theme")) as Theme | null;
      if (
        savedTheme &&
        ["light", "dark", "blue", "green"].includes(savedTheme)
      ) {
        dispatch(loadTheme(savedTheme));
      } else {
        dispatch(loadTheme("light"));
      }
    } catch (error) {
      console.error("Error loading theme:", error);
      dispatch(loadTheme("light"));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return <>{children}</>;
};
