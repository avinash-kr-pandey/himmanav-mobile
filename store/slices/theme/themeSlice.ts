// store/slices/theme/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEMES, type Theme, themeColors } from "./themeConfig";

interface ThemeState {
  currentTheme: Theme;
  colors: typeof themeColors.light;
}

const initialState: ThemeState = {
  currentTheme: "light",
  colors: themeColors.light,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload;
      state.colors = themeColors[action.payload];
      // Save to AsyncStorage
      AsyncStorage.setItem("theme", action.payload).catch(console.error);
    },
    loadTheme: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload;
      state.colors = themeColors[action.payload];
    },
  },
});

export const { setTheme, loadTheme } = themeSlice.actions;
export default themeSlice.reducer;
