import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

interface MenuItem {
  name: string;
  label: string;
  icon: string;
  onPress?: () => void;
}

interface DynamicDrawerProps {
  props: any;
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
  };
  menuItems?: MenuItem[];
}

const defaultMenuItems: MenuItem[] = [
  { name: 'home', label: 'Home', icon: 'home-outline' },
  { name: 'explore', label: 'Explore', icon: 'compass-outline' },
  { name: 'profile', label: 'Profile', icon: 'person-outline' },
  { name: 'settings', label: 'Settings', icon: 'settings-outline' },
];

export default function DynamicDrawer({
  props,
  userInfo = {
    name: 'Guest User',
    email: 'guest@example.com',
  },
  menuItems = defaultMenuItems,
}: DynamicDrawerProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {userInfo.avatar ? (
            <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {userInfo.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.userName}>{userInfo.name}</Text>
        <Text style={styles.userEmail}>{userInfo.email}</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={styles.menuItem}
            onPress={() => {
              props.navigation.navigate(item.name);
              props.navigation.closeDrawer();
            }}
          >
            <Ionicons name={item.icon as any} size={24} color="#6b7280" />
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          <Text style={[styles.menuLabel, { color: '#ef4444' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#e0e7ff',
  },
  menuSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  menuLabel: {
    fontSize: 16,
    marginLeft: 12,
    color: '#374151',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 20,
    paddingTop: 20,
  },
});