// hooks/useTheme.ts
import { useSelector, useDispatch } from "react-redux";

import { Platform, StatusBar } from "react-native";
import { RootState } from "../../store";
import { Theme } from "../../store/slices/theme/themeConfig";
import { setTheme } from "../../store/slices/theme/themeSlice";

export const useTheme = () => {
  const dispatch = useDispatch();
  const { currentTheme, colors } = useSelector(
    (state: RootState) => state.theme,
  );

  const changeTheme = (theme: Theme) => {
    dispatch(setTheme(theme));
  };

  // Get header color based on theme
  const getHeaderColor = () => {
    switch (currentTheme) {
      case "dark":
        return "#1F2937";
      case "blue":
        return "#1E40AF";
      case "green":
        return "#166534";
      default:
        return "#FFFFFF";
    }
  };

  // Get status bar style
  const getStatusBarStyle = () => {
    if (currentTheme === "dark") {
      return "light";
    }
    return "dark";
  };

  return {
    theme: currentTheme,
    colors,
    changeTheme,
    isDark: currentTheme === "dark",
    isLight: currentTheme === "light",
    isBlue: currentTheme === "blue",
    isGreen: currentTheme === "green",
    headerColor: getHeaderColor(),
    statusBarStyle: getStatusBarStyle(),
  };
};
