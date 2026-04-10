import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");

export const AuthWhyChoose = () => {
  const features = [
    {
      id: 1,
      title: "Agility",
      description:
        "Through Himmanav's advanced technology and adaptive solutions, we make your asset management agile",
      icon: "chart-line",
    },
    {
      id: 2,
      title: "Elasticity",
      description:
        "Seamlessly scale your asset portfolio with our flexible management solutions",
      icon: "truck",
    },
    {
      id: 3,
      title: "Accuracy",
      description:
        "Achieve 99%+ accuracy in asset tracking and valuation with our precision tools",
      icon: "bullseye",
    },
    {
      id: 4,
      title: "Resilience",
      description:
        "Benefit from a resilient asset management system built on Himmanav's robust digital infrastructure",
      icon: "shield-alt",
    },
    {
      id: 5,
      title: "Visibility",
      description:
        "Gain real-time visibility into your assets through our comprehensive dashboard and reporting tools",
      icon: "eye",
    },
    {
      id: 6,
      title: "Accountability",
      description:
        "Streamlined accountability with integrated tracking and reporting for all your assets",
      icon: "check-circle",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <MaterialIcons name="stars" size={18} color="#4361ee" />
          <Text style={styles.headerBadgeText}>Why Choose Us</Text>
        </View>
        <Text style={styles.headerTitle}>
          The <Text style={styles.headerHighlight}>Himmanav Advantage</Text>
        </Text>
        <Text style={styles.headerSubtitle}>
          Why settle for fragmented asset management with multiple disconnected
          solutions when Himmanav offers a comprehensive, full-stack asset
          management platform.
        </Text>
      </View>

      {/* Features Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.featuresGrid}>
          {features.map((feature) => (
            <View key={feature.id} style={styles.featureCard}>
              {/* Card Number */}
              <View style={styles.cardNumber}>
                <Text style={styles.cardNumberText}>
                  {feature.id.toString().padStart(2, "0")}
                </Text>
              </View>

              {/* Icon */}
              <View style={styles.iconWrapper}>
                <Icon name={feature.icon} size={28} color="#4361ee" solid />
              </View>

              {/* Title */}
              <Text style={styles.featureTitle}>{feature.title}</Text>

              {/* Description */}
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
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
  scrollContent: {
    paddingBottom: 24,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 12,
  },
  featureCard: {
    width: (width - 44) / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 4,
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
  cardNumber: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  cardNumberText: {
    fontSize: 10,
    color: "#D1D5DB",
    fontWeight: "600",
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
});
