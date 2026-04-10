import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { MaterialIcons } from "@expo/vector-icons";
import { featurecardimg1, featurecardimg2 } from "../../../assets/useImage";

const { width } = Dimensions.get("window");

export const AuthCrmManagement = () => {
  const managementData = [
    {
      id: 1,
      title: "Manage Your Clients Effectively",
      icon: "users",
      image: featurecardimg1,
      points: [
        {
          icon: "check-circle",
          text: "Keep all your client interactions, deals, and updates in one place.",
        },
        {
          icon: "clock",
          text: "Track sales progress in real-time and never miss a follow-up.",
        },
        {
          icon: "bolt",
          text: "Give every customer fast, personalized service automatically.",
        },
      ],
    },
    {
      id: 2,
      title: "Enhance Operational Efficiency",
      icon: "chart-line",
      image: featurecardimg2,
      points: [
        {
          icon: "cog",
          text: "Integrates all your tools into one seamless, easy-to-use dashboard.",
        },
        {
          icon: "chart-bar",
          text: "Simplifies daily operations for smoother and more efficient workflows.",
        },
        {
          icon: "check-circle",
          text: "Built-in analytics to track KPIs, gain insights, and drive smart decisions.",
        },
      ],
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* Header Section - Full Width */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <MaterialIcons name="stars" size={18} color="#4361ee" />
          <Text style={styles.headerBadgeText}>CRM Solutions</Text>
        </View>
        <Text style={styles.headerTitle}>
          Smart <Text style={styles.headerHighlight}>CRM Management</Text>
        </Text>
        <Text style={styles.headerSubtitle}>
          Powerful tools to streamline your customer relationships and business
          operations
        </Text>
      </View>

      {/* Management Cards - Full Width */}
      {managementData.map((item, index) => (
        <View key={item.id} style={styles.card}>
          {/* Image Section - Full Width */}
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* Content Section - Full Width */}
          <View style={styles.contentContainer}>
            <View style={styles.titleWrapper}>
              <View style={styles.iconWrapper}>
                <Icon name={item.icon} size={24} color="#4361ee" solid />
              </View>
              <Text style={styles.title}>{item.title}</Text>
            </View>

            <View style={styles.pointsContainer}>
              {item.points.map((point, idx) => (
                <View key={idx} style={styles.pointWrapper}>
                  <View style={styles.pointIconWrapper}>
                    <Icon name={point.icon} size={14} color="#22C55E" solid />
                  </View>
                  <Text style={styles.pointText}>{point.text}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}

      {/* Bottom CTA - Full Width */}
      <View style={styles.bottomCTA}>
        <View style={styles.ctaContent}>
          <Text style={styles.ctaTitle}>Ready to get started?</Text>
          <Text style={styles.ctaSubtitle}>
            Join thousands of businesses using our CRM solutions
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: width,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 20 : 24,
    paddingBottom: 24,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
  card: {
    width: width,
    backgroundColor: "#FFFFFF",
    marginBottom: 24,
  },
  imageContainer: {
    width: width,
    backgroundColor: "#F9FAFB",
    paddingVertical: 32,
    alignItems: "center",
  },
  image: {
    width: width - 80,
    height: 220,
  },
  contentContainer: {
    width: width,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    lineHeight: 28,
  },
  pointsContainer: {
    gap: 16,
  },
  pointWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  pointIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  pointText: {
    flex: 1,
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 22,
  },
  bottomCTA: {
    width: width,
    backgroundColor: "#F9FAFB",
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  ctaContent: {
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
});
