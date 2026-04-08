import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { colors } from '../../../constants/colors';


export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name || 'User Name'}</Text>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Member Since</Text>
          <Text style={styles.infoValue}>
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>User ID</Text>
          <Text style={styles.infoValue}>{user?.id || 'N/A'}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.surface,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.textLight,
  },
  infoContainer: {
    padding: 20,
    gap: 16,
  },
  infoItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
});