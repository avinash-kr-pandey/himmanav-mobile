import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDrawerNavigation } from "../../hooks/useDrawerNavigation";

interface DynamicHeaderProps {
  title: string;
  showBack?: boolean;
  showMenu?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
  backgroundColor?: string;
}

export default function DynamicHeader({
  title,
  showBack = false,
  showMenu = false,
  rightIcon,
  onRightPress,
  backgroundColor = "#ffffff",
}: DynamicHeaderProps) {
  const { navigation, openDrawer } = useDrawerNavigation();

  return (
    <View style={[styles.header, { backgroundColor }]}>
      <View style={styles.leftContainer}>
        {showMenu && (
          <TouchableOpacity onPress={openDrawer} style={styles.iconButton}>
            <Ionicons name="menu" size={24} color="#333" />
          </TouchableOpacity>
        )}
        {showBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
            <Ionicons name={rightIcon as any} size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 44 : StatusBar.currentHeight,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
  },
});
