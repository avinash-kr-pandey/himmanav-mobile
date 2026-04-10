import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

// Mock data - replace with your actual API call
const mockPlans: Plan[] = [
  {
    id: "1",
    name: "Starter",
    price: 999,
    features: [
      "Admin Access",
      "Basic CRM Features",
      "Email Support",
      "Up to 10 Users",
    ],
  },
  {
    id: "2",
    name: "Premium",
    price: 1999,
    features: [
      "All Starter Features",
      "Advanced Analytics",
      "Priority Support",
      "Unlimited Users",
      "AI Features",
      "Custom Reports",
    ],
    popular: true,
  },
  {
    id: "3",
    name: "Enterprise",
    price: 4999,
    features: [
      "All Premium Features",
      "Dedicated Support",
      "Custom Integration",
      "SLA Guarantee",
      "Training Included",
      "API Access",
    ],
  },
];

// Mock hook - replace with your actual RTK Query hook
const useFetchPackagesQuery = () => {
  return { data: { data: mockPlans }, isLoading: false };
};

export const AuthPackages = () => {
  const { data, isLoading } = useFetchPackagesQuery();
  const plans = data?.data || [];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4361ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <MaterialIcons name="sell" size={18} color="#4361ee" />
          <Text style={styles.headerBadgeText}>Pricing Plans</Text>
        </View>
        <Text style={styles.headerTitle}>
          Choose Your <Text style={styles.headerHighlight}>Perfect Plan</Text>
        </Text>
        <Text style={styles.headerSubtitle}>
          Flexible pricing options for businesses of all sizes
        </Text>
      </View>

      {/* Plans Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.plansContainer}
        contentContainerStyle={styles.plansContent}
        decelerationRate="fast"
        snapToInterval={width - 80}
        snapToAlignment="center"
      >
        {plans.map((plan) => (
          <View
            key={plan.id}
            style={[styles.planCard, plan.popular && styles.planCardPopular]}
          >
            {/* Popular Badge - Now properly positioned */}
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Icon name="star" size={12} color="#fff" solid />
                <Text style={styles.popularText}>Most Popular</Text>
              </View>
            )}

            {/* Plan Content */}
            <View style={styles.planContent}>
              {/* Plan Name */}
              <Text style={styles.planName}>{plan.name}</Text>

              {/* Price */}
              <View style={styles.priceContainer}>
                <Text style={styles.currency}>₹</Text>
                <Text style={styles.price}>{plan.price.toLocaleString()}</Text>
                <Text style={styles.duration}>/year</Text>
              </View>

              {/* Features List */}
              <View style={styles.featuresWrapper}>
                <View style={styles.featuresContainer}>
                  {plan.features.map((feature, idx) => (
                    <View key={idx} style={styles.featureItem}>
                      <Icon
                        name="check-circle"
                        size={14}
                        color="#22C55E"
                        solid
                      />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Select Button */}
            <TouchableOpacity
              style={[
                styles.selectButton,
                plan.popular && styles.selectButtonPopular,
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.selectButtonText,
                  plan.popular && styles.selectButtonTextPopular,
                ]}
              >
                Get Started
              </Text>
              <Icon
                name="arrow-right"
                size={14}
                color={plan.popular ? "#fff" : "#4361ee"}
                solid
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Footer Note */}
      <View style={styles.footer}>
        <Icon name="shield-alt" size={12} color="#9CA3AF" solid />
        <Text style={styles.footerText}>
          All plans include 14-day free trial. No credit card required.
        </Text>
      </View>
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
  loadingContainer: {
    padding: 40,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  plansContainer: {
    marginTop: 8,
  },
  plansContent: {
    paddingHorizontal: 20,
    gap: 16,
    alignItems: "stretch",
    paddingTop: 16,
    paddingBottom: 8,
  },
  planCard: {
    width: width - 80,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    position: "relative",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  planCardPopular: {
    borderColor: "#4361ee",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#4361ee",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  popularBadge: {
    position: "absolute",
    top: -12,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4361ee",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  popularText: {
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  planContent: {
    flex: 1,
  },
  planName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    marginTop: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 24,
  },
  currency: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4361ee",
    marginRight: 2,
  },
  price: {
    fontSize: 42,
    fontWeight: "700",
    color: "#4361ee",
  },
  duration: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
  featuresWrapper: {
    flex: 1,
    marginBottom: 28,
  },
  featuresContainer: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureText: {
    fontSize: 13,
    color: "#4B5563",
    flex: 1,
    lineHeight: 18,
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: "auto",
  },
  selectButtonPopular: {
    backgroundColor: "#4361ee",
    borderColor: "#4361ee",
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4361ee",
  },
  selectButtonTextPopular: {
    color: "#FFFFFF",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
  },
});
