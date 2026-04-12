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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function AboutScreen() {
  const handleEmailPress = () => {
    Linking.openURL("mailto:support@himmanav.com");
  };

  const handlePhonePress = () => {
    Linking.openURL("tel:+919459679357");
  };

  const handleAddressPress = () => {
    Linking.openURL("https://maps.google.com/?q=Manla,PO Kiarkoti,Shimla,171007");
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <MaterialIcons name="info" size={18} color="#4361ee" />
          <Text style={styles.headerBadgeText}>About Us</Text>
        </View>
        <Text style={styles.headerTitle}>
          Empowering{"\n"}
          <Text style={styles.headerHighlight}>Businesses Worldwide</Text>
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Introduction */}
        <View style={styles.card}>
          <View style={styles.cardIcon}>
            <Icon name="rocket" size={24} color="#4361ee" solid />
          </View>
          <Text style={styles.cardText}>
            At Himmanav Asset Management Technology, we are committed to empowering 
            businesses with the tools they need to succeed. Our platform combines 
            intuitive business management tools, data-driven insights, and personalized 
            support to help you streamline operations and enhance your business performance.
          </Text>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Icon name="bullseye" size={20} color="#4361ee" solid />
            </View>
            <Text style={styles.sectionTitle}>Our Mission</Text>
          </View>
          <Text style={styles.sectionText}>
            Our mission is to simplify business operations and help companies scale with ease. 
            We strive to create accessible, user-friendly solutions that provide clarity, 
            transparency, and control over every aspect of your business.
          </Text>
        </View>

        {/* What We Offer */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Icon name="gift" size={20} color="#4361ee" solid />
            </View>
            <Text style={styles.sectionTitle}>What We Offer</Text>
          </View>
          <View style={styles.featuresGrid}>
            {[
              { icon: "briefcase", text: "Comprehensive business management tools for efficient operations" },
              { icon: "chart-line", text: "Real-time dashboards and analytics to track business performance" },
              { icon: "cloud", text: "Secure, scalable cloud-based infrastructure for seamless collaboration" },
              { icon: "headset", text: "Expert support and personalized business advisory services" },
              { icon: "users", text: "Team collaboration tools to enhance internal communication" },
              { icon: "tasks", text: "Task and project management features to streamline workflows" },
            ].map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Icon name={feature.icon} size={14} color="#22C55E" solid />
                </View>
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Our Commitment */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Icon name="handshake" size={20} color="#4361ee" solid />
            </View>
            <Text style={styles.sectionTitle}>Our Commitment</Text>
          </View>
          <Text style={styles.sectionText}>
            We are committed to maintaining the highest standards of security, transparency, 
            and trust. Our team works tirelessly to ensure that your data is protected, and 
            your business processes are optimized for success.
          </Text>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Icon name="envelope" size={20} color="#4361ee" solid />
            </View>
            <Text style={styles.sectionTitle}>Contact Us</Text>
          </View>
          <Text style={styles.contactText}>
            Have questions or want to learn more? Get in touch with us:
          </Text>

          <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
            <View style={styles.contactIcon}>
              <Icon name="envelope" size={16} color="#4361ee" solid />
            </View>
            <Text style={styles.contactLink}>support@himmanav.com</Text>
            <Icon name="external-link-alt" size={12} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
            <View style={styles.contactIcon}>
              <Icon name="phone" size={16} color="#4361ee" solid />
            </View>
            <Text style={styles.contactLink}>+91-9459679357</Text>
            <Icon name="external-link-alt" size={12} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={handleAddressPress}>
            <View style={styles.contactIcon}>
              <Icon name="map-marker-alt" size={16} color="#4361ee" solid />
            </View>
            <Text style={styles.contactText} numberOfLines={2}>
              Manla, PO Kiarkoti, T&D Shimla, 171007
            </Text>
            <Icon name="external-link-alt" size={12} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLine} />
        <Text style={styles.footerText}>
          © 2024 Himmanav Asset Management Technology. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: width,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 40 : 24,
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
    lineHeight: Platform.OS === "ios" ? 40 : 36,
  },
  headerHighlight: {
    color: "#4361ee",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
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
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  cardText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 22,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  sectionText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
    paddingLeft: 44,
  },
  featuresGrid: {
    gap: 12,
    paddingLeft: 44,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  featureIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  contactSection: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  contactText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: 12,
  },
  contactIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  contactLink: {
    flex: 1,
    fontSize: 14,
    color: "#4361ee",
    fontWeight: "500",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: "center",
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