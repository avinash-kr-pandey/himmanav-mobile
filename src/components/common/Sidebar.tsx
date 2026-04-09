// components/common/Sidebar.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { colors } from "../../constants/colors";
import { getMenuItems, MenuItem } from "../../constants/tab&sidebar/data";

interface SidebarProps {
  onClose: () => void;
}

const { width, height } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.8;

export default function Sidebar({ onClose }: SidebarProps) {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenuItems();
  }, [user?.user_type]);

  const loadMenuItems = () => {
    setLoading(true);
    const items = getMenuItems(user?.user_type || "employee");
    setMenuItems(items);
    setLoading(false);
  };

  const handleNavigation = (screen: string) => {
    onClose();
    setTimeout(() => {
      navigation.navigate(screen as never);
    }, 300);
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          onClose();
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: SIDEBAR_WIDTH }]}>
      {/* Close Button - Top Right */}
      <TouchableOpacity
        style={[styles.closeButton, { top: insets.top + 16 }]}
        onPress={onClose}
        activeOpacity={0.7}
      >
        <Text style={styles.closeIcon}>✕</Text>
      </TouchableOpacity>

      {/* User Profile Section */}
      <View style={[styles.profileSection, { paddingTop: insets.top + 60 }]}>
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>
            {user?.name?.charAt(0) || "G"}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.name || "Guest User"}</Text>
        <Text style={styles.userEmail}>
          {user?.email || "guest@example.com"}
        </Text>
        <View style={styles.userTypeBadge}>
          <View style={styles.badgeDot} />
          <Text style={styles.userTypeText}>
            {user?.user_type?.toUpperCase() || "EMPLOYEE"}
          </Text>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView
        style={styles.menuContainer}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleNavigation(item.screen)}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}

        {/* Logout as menu item */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.menuIcon}>🚪</Text>
          <Text style={[styles.menuTitle, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    zIndex: 1,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "600",
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary || "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  userAvatarText: {
    fontSize: 36,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  userTypeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
    marginRight: 6,
  },
  userTypeText: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
  },
  menuContainer: {
    flex: 1,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginVertical: 2,
    borderRadius: 10,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  menuTitle: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },
  logoutText: {
    color: "#EF4444",
  },
});
