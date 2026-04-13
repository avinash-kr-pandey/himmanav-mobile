// screens/profile/components/SessionsList.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Ionicons } from "@expo/vector-icons";

interface Session {
  token_id: string;
  ip_address: string;
  location: string;
  created_at: string;
  last_used_at: string;
}

interface SessionsListProps {
  sessions: Session[];
  totalLogins: number;
  isLoading: boolean;
  formatDate: (date: string) => string;
}

export default function SessionsList({
  sessions,
  totalLogins,
  isLoading,
  formatDate,
}: SessionsListProps) {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Sessions</Text>
        <View style={styles.sessionCount}>
          <Text style={styles.sessionCountText}>{sessions.length}</Text>
        </View>
      </View>

      <View style={styles.sessionsCard}>
        <View style={styles.totalLoginsRow}>
          <Icon name="sign-in-alt" size={14} color="#6B7280" />
          <Text style={styles.totalLoginsLabel}>Total Logins</Text>
          <Text style={styles.totalLoginsValue}>{totalLogins}</Text>
        </View>

        {sessions.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="globe" size={40} color="#D1D5DB" />
            <Text style={styles.emptyStateTitle}>No active sessions</Text>
            <Text style={styles.emptyStateMessage}>
              You don't have any active login sessions at this time.
            </Text>
          </View>
        ) : (
          <FlatList
            data={sessions}
            keyExtractor={(item) => item.token_id}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.sessionItem,
                  index === sessions.length - 1 && styles.lastSessionItem,
                ]}
              >
                <View style={styles.sessionIcon}>
                  <Icon name="globe" size={20} color="#3B82F6" />
                </View>
                <View style={styles.sessionDetails}>
                  <View style={styles.sessionMeta}>
                    <Text style={styles.sessionIp}>{item.ip_address}</Text>
                    <Text style={styles.sessionLocation}>{item.location}</Text>
                  </View>
                  <View style={styles.sessionInfo}>
                    <View style={styles.sessionInfoItem}>
                      <Ionicons
                        name="calendar-outline"
                        size={12}
                        color="#9CA3AF"
                      />
                      <Text style={styles.sessionInfoText}>
                        Created {formatDate(item.created_at)}
                      </Text>
                    </View>
                    <View style={styles.sessionInfoItem}>
                      <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                      <Text style={styles.sessionInfoText}>
                        Last used {formatDate(item.last_used_at)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  sessionCount: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  sessionCountText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#3B82F6",
  },
  sessionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    overflow: "hidden",
  },
  totalLoginsRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: 8,
  },
  totalLoginsLabel: {
    flex: 1,
    fontSize: 13,
    color: "#6B7280",
  },
  totalLoginsValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  emptyState: {
    alignItems: "center",
    padding: 32,
    gap: 12,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
  },
  emptyStateMessage: {
    fontSize: 13,
    color: "#9CA3AF",
    textAlign: "center",
  },
  sessionItem: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  lastSessionItem: {
    borderBottomWidth: 0,
  },
  sessionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  sessionDetails: {
    flex: 1,
    gap: 6,
  },
  sessionMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  sessionIp: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1F2937",
  },
  sessionLocation: {
    fontSize: 12,
    color: "#6B7280",
  },
  sessionInfo: {
    flexDirection: "row",
    gap: 16,
  },
  sessionInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sessionInfoText: {
    fontSize: 11,
    color: "#9CA3AF",
  },
});
