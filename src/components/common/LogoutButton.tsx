// components/common/LogoutButton.tsx (Alternative)
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../contexts/AuthContext";
import { clearStorage } from "../../utils/storage";
import { useLogoutMutation } from "../../../store/authApi";
import { setTheme } from "../../../store/slices/theme/themeSlice";
import { RootStackParamList } from "../navigation/AppNavigator";


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LogoutButton() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const { setUser } = useAuth();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await logout().unwrap();

            if (response?.message) {
              setUser(null);
              await clearStorage();
              dispatch(setTheme("light"));

              // Using reset with proper type
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }
          } catch (error: any) {
            Alert.alert("Error", error?.data?.message || "Failed to logout");
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#EF4444" />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
      <Icon name="sign-out-alt" size={16} color="#EF4444" />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "500",
  },
  loadingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
