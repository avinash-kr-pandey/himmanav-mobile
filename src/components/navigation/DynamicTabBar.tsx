import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

export interface TabItem {
  name: string;
  label: string;
  icon: string;
  activeIcon: string;
}

export default function DynamicTabBar({
  state,
  descriptors,
  navigation,
  tabConfig,
}: BottomTabBarProps & { tabConfig: TabItem[] }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]; // ✅ Fix: Get options from descriptors
        const isFocused = state.index === index;
        const tabItem = tabConfig.find((tab) => tab.name === route.name);

        if (!tabItem) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <Ionicons
              name={isFocused ? (tabItem.activeIcon as any) : (tabItem.icon as any)}
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
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});