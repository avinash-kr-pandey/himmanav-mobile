import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

export interface TabItem {
  name: string;
  label: string;
  icon: IconName;
  activeIcon: IconName;
}

interface DynamicTabBarProps extends BottomTabBarProps {
  tabConfig: TabItem[];
}

const colors = {
  primary: "#6366f1",
  textLighter: "#9ca3af",
  surface: "#ffffff",
  border: "#e5e7eb",
};

const DynamicTabBar: React.FC<DynamicTabBarProps> = ({
  state,
  descriptors,
  navigation,
  tabConfig,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const tabItem = tabConfig.find((tab) => tab.name === route.name);

        if (!tabItem) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name as never);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            // ✅ CRITICAL FIX: accessibilityState removed completely
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <Ionicons
              name={isFocused ? tabItem.activeIcon : tabItem.icon}
              size={24}
              color={isFocused ? colors.primary : colors.textLighter}
            />
            <Text
              style={[
                styles.label,
                { color: isFocused ? colors.primary : colors.textLighter },
              ]}
            >
              {tabItem.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default DynamicTabBar;
