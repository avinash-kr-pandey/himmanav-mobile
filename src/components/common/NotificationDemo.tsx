import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNotifications } from "../../hooks/useNotifications";
import { colors } from "../../constants/colors";


export default function NotificationDemo() {
  const {
    fcmToken,
    permissionGranted,
    refreshToken,
    sendTestNotification,
    scheduleTestNotification,
  } = useNotifications();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📱 Notification Demo</Text>
        <Text style={styles.subtitle}>
          Static Version - No Backend Required
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Status</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Permission:</Text>
          <Text
            style={[
              styles.statusValue,
              permissionGranted && styles.statusSuccess,
            ]}
          >
            {permissionGranted ? "✅ Granted" : "❌ Denied"}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>FCM Token:</Text>
          <Text style={styles.statusValue} numberOfLines={2}>
            {fcmToken || "Not available"}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Test Notifications</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={sendTestNotification}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Send Test Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => scheduleTestNotification(3)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Schedule Notification (3s)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => scheduleTestNotification(10)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Schedule Notification (10s)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Token Management</Text>

        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={refreshToken}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonOutlineText}>Refresh Token</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          ℹ️ This is a static demo. No actual Firebase or backend is required.
          Notifications will appear as alerts on your device.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 24,
    backgroundColor: colors.primary || "#6366F1",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    margin: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  statusValue: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  statusSuccess: {
    color: "#10B981",
  },
  button: {
    backgroundColor: colors.primary || "#6366F1",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonSecondary: {
    backgroundColor: "#8B5CF6",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary || "#6366F1",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonOutlineText: {
    color: colors.primary || "#6366F1",
    fontSize: 16,
    fontWeight: "600",
  },
  infoBox: {
    backgroundColor: "#FEF3C7",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    marginTop: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#92400E",
    lineHeight: 18,
  },
});
