import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Platform,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ContactScreen() {
  const handleEmailPress = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handlePhonePress = () => {
    Linking.openURL("tel:+919459679357");
  };

  const handleMapPress = () => {
    Linking.openURL(
      "https://maps.google.com/?q=Manla,PO+Kiarkoti,Shimla,171007",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
        overScrollMode="always"
        contentContainerStyle={styles.scrollContent}
        decelerationRate="normal"
        scrollEventThrottle={16}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <MaterialIcons name="contact-phone" size={18} color="#4361ee" />
            <Text style={styles.headerBadgeText}>Get in Touch</Text>
          </View>
          <Text style={styles.headerTitle}>
            We'd Love to{"\n"}
            <Text style={styles.headerHighlight}>Hear From You</Text>
          </Text>
          <Text style={styles.headerSubtitle}>
            Reach out to our team for inquiries, support, or partnership
            opportunities
          </Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Quick Contact Cards */}
          <View style={styles.quickContact}>
            <TouchableOpacity
              style={styles.quickCard}
              onPress={handlePhonePress}
              activeOpacity={0.7}
            >
              <View style={styles.quickIcon}>
                <Icon name="phone-alt" size={24} color="#4361ee" solid />
              </View>
              <Text style={styles.quickLabel}>Call Us</Text>
              <Text style={styles.quickValue}>+91-9459679357</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickCard}
              onPress={() => handleEmailPress("info@himmanav.com")}
              activeOpacity={0.7}
            >
              <View style={styles.quickIcon}>
                <Icon name="envelope" size={24} color="#4361ee" solid />
              </View>
              <Text style={styles.quickLabel}>Email Us</Text>
              <Text style={styles.quickValue}>info@himmanav.com</Text>
            </TouchableOpacity>
          </View>

          {/* General Inquiries */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Icon name="comments" size={20} color="#4361ee" solid />
              </View>
              <Text style={styles.sectionTitle}>General Inquiries</Text>
            </View>
            <View style={styles.contactDetails}>
              <TouchableOpacity
                style={styles.contactRow}
                onPress={() => handleEmailPress("info@himmanav.com")}
                activeOpacity={0.7}
              >
                <Icon name="envelope" size={16} color="#6B7280" solid />
                <Text style={styles.contactLink}>info@himmanav.com</Text>
                <Icon name="external-link-alt" size={12} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.contactRow, styles.lastContactRow]}
                onPress={handlePhonePress}
                activeOpacity={0.7}
              >
                <Icon name="phone" size={16} color="#6B7280" solid />
                <Text style={styles.contactLink}>+91-9459679357</Text>
                <Icon name="external-link-alt" size={12} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Office Address */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Icon name="map-marker-alt" size={20} color="#4361ee" solid />
              </View>
              <Text style={styles.sectionTitle}>Office Address</Text>
            </View>
            <TouchableOpacity
              style={styles.addressCard}
              onPress={handleMapPress}
              activeOpacity={0.7}
            >
              <View style={styles.addressIcon}>
                <Icon name="building" size={20} color="#4361ee" solid />
              </View>
              <View style={styles.addressContent}>
                <Text style={styles.addressCompany}>
                  Himmanav Asset Management Technology
                </Text>
                <Text style={styles.addressText}>Manla, PO Kiarkoti</Text>
                <Text style={styles.addressText}>T&D Shimla, 171007</Text>
                <Text style={styles.addressText}>Himachal Pradesh, India</Text>
              </View>
              <Icon name="external-link-alt" size={14} color="#4361ee" />
            </TouchableOpacity>
          </View>

          {/* Business Hours */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Icon name="clock" size={20} color="#4361ee" solid />
              </View>
              <Text style={styles.sectionTitle}>Business Hours</Text>
            </View>
            <View style={styles.hoursCard}>
              <View style={styles.hourItem}>
                <View style={styles.hourDay}>
                  <Icon name="calendar-day" size={14} color="#4361ee" solid />
                  <Text style={styles.hourDayText}>Monday-Friday</Text>
                </View>
                <Text style={styles.hourTime}>9:00 AM - 6:00 PM IST</Text>
              </View>
              <View style={styles.hourItem}>
                <View style={styles.hourDay}>
                  <Icon name="calendar-week" size={14} color="#4361ee" solid />
                  <Text style={styles.hourDayText}>Saturday</Text>
                </View>
                <Text style={styles.hourTime}>10:00 AM - 2:00 PM IST</Text>
              </View>
              <View style={styles.hourItem}>
                <View style={styles.hourDay}>
                  <Icon name="calendar-times" size={14} color="#EF4444" solid />
                  <Text style={[styles.hourDayText, styles.hourClosed]}>
                    Sunday
                  </Text>
                </View>
                <Text style={[styles.hourTime, styles.hourClosedText]}>
                  Closed
                </Text>
              </View>
            </View>
          </View>

          {/* Departments */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Icon name="users" size={20} color="#4361ee" solid />
              </View>
              <Text style={styles.sectionTitle}>Departments</Text>
            </View>
            <View style={styles.departmentsCard}>
              <TouchableOpacity
                style={styles.deptItem}
                onPress={() => handleEmailPress("support@himmanav.com")}
                activeOpacity={0.7}
              >
                <View style={styles.deptIcon}>
                  <Icon name="headset" size={16} color="#22C55E" solid />
                </View>
                <View style={styles.deptContent}>
                  <Text style={styles.deptTitle}>Support</Text>
                  <Text style={styles.deptEmail}>support@himmanav.com</Text>
                </View>
                <Icon name="chevron-right" size={14} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deptItem}
                onPress={() => handleEmailPress("sales@himmanav.com")}
                activeOpacity={0.7}
              >
                <View style={styles.deptIcon}>
                  <Icon name="chart-line" size={16} color="#3B82F6" solid />
                </View>
                <View style={styles.deptContent}>
                  <Text style={styles.deptTitle}>Sales</Text>
                  <Text style={styles.deptEmail}>sales@himmanav.com</Text>
                </View>
                <Icon name="chevron-right" size={14} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.deptItem, styles.lastDeptItem]}
                onPress={() => handleEmailPress("careers@himmanav.com")}
                activeOpacity={0.7}
              >
                <View style={styles.deptIcon}>
                  <Icon name="briefcase" size={16} color="#F59E0B" solid />
                </View>
                <View style={styles.deptContent}>
                  <Text style={styles.deptTitle}>Careers</Text>
                  <Text style={styles.deptEmail}>careers@himmanav.com</Text>
                </View>
                <Icon name="chevron-right" size={14} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>
            We respond to all inquiries within 24 hours
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.OS === "ios" ? 20 : 24,
  },
  header: {
    width: width,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 20 : 24,
    paddingBottom: 24,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
    gap: 8,
  },
  headerBadgeText: {
    fontSize: 12,
    color: "#4361ee",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: Platform.OS === "ios" ? 32 : 28,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: Platform.OS === "ios" ? 40 : 36,
  },
  headerHighlight: {
    color: "#4361ee",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  quickContact: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 28,
  },
  quickCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  quickIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  quickLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  quickValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4361ee",
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  contactDetails: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    overflow: "hidden",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  lastContactRow: {
    borderBottomWidth: 0,
  },
  contactLink: {
    flex: 1,
    fontSize: 14,
    color: "#4361ee",
    fontWeight: "500",
  },
  addressCard: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    alignItems: "flex-start",
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  addressContent: {
    flex: 1,
  },
  addressCompany: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  hoursCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  hourItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hourDay: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  hourDayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
  },
  hourTime: {
    fontSize: 14,
    color: "#6B7280",
  },
  hourClosed: {
    color: "#EF4444",
  },
  hourClosedText: {
    color: "#EF4444",
  },
  departmentsCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    overflow: "hidden",
  },
  deptItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  lastDeptItem: {
    borderBottomWidth: 0,
  },
  deptIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  deptContent: {
    flex: 1,
  },
  deptTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  deptEmail: {
    fontSize: 12,
    color: "#6B7280",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: "center",
    marginTop: 8,
  },
  footerLine: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
  },
});
