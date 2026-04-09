// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

interface ThemeContextType {
  isDarkMode: boolean;
  headerColor: string;
  statusBarStyle: "light" | "dark";
  setHeaderColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");
  const [headerColor, setHeaderColor] = useState("#FFFFFF"); // Changed to White

  // Calculate status bar style based on header color brightness
  const getStatusBarStyle = (color: string): "light" | "dark" => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "dark" : "light";
  };

  useEffect(() => {
    setIsDarkMode(systemColorScheme === "dark");
  }, [systemColorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        headerColor,
        statusBarStyle: getStatusBarStyle(headerColor),
        setHeaderColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
