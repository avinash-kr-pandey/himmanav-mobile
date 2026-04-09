// app/(app)/home/components/Header.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { colors } from "../../../constants/colors";

const Header = () => {
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.dateText}>{currentDate}</Text>
        <Text style={styles.welcomeText}>
          Welcome back,{" "}
          <Text style={styles.userName}>{user?.name || "User"}</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.profileButton}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0) || "U"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  dateText: {
    fontSize: 14,
    color: colors.primaryLight,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.surface,
  },
  userName: {
    fontWeight: "bold",
  },
  profileButton: {
    padding: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.surface,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default Header;
