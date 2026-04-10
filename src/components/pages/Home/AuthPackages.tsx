import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

// Mock data - replace with your actual API call
const mockPlans: Plan[] = [
  {
    id: "1",
    name: "Starter Plan",
    price: 1000,
    features: [
      "Admin Access",
      "Basic CRM Features",
      "Email Support",
      "Up to 10 Users",
    ],
  },
  {
    id: "2",
    name: "Premium Plan",
    price: 500,
    features: [
      "All Starter Features",
      "Advanced Analytics",
      "Priority Support",
      "Unlimited Users",
      "AI Features",
    ],
  },
];

// Mock hook - replace with your actual RTK Query hook
const useFetchPackagesQuery = () => {
  return { data: { data: mockPlans }, isLoading: false };
};

export const AuthPackages = () => {
  const { data, isLoading } = useFetchPackagesQuery();
  const plans = data?.data?.slice(0, 2) || [];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4361ee" />
      </View>
    );
  }

  return (
    <View style={styles.packagesSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          <Icon name="tags" size={20} color="#4361ee" /> Our Pricing Plans
        </Text>
        <Text style={styles.sectionSubtitle}>
          Choose the perfect plan for your business needs
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.packagesContainer}
      >
        {plans.map((plan) => (
          <View key={plan.id} style={styles.packageCard}>
            <Text style={styles.packageName}>{plan.name}</Text>
            <View style={styles.packagePrice}>
              <Text style={styles.currency}>₹</Text>
              <Text style={styles.price}>{plan.price}</Text>
              <Text style={styles.duration}>/year</Text>
            </View>
            <View style={styles.featuresList}>
              {plan.features.map((feature, idx) => (
                <View key={idx} style={styles.featureItem}>
                  <Icon name="check-circle" size={16} color="#22C55E" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.selectButtonText}>Select Plan</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  packagesSection: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  packagesContainer: {
    flexDirection: "row",
  },
  packageCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginRight: 16,
    width: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  packageName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 16,
  },
  packagePrice: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  currency: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4361ee",
  },
  price: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4361ee",
  },
  duration: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  featuresList: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  selectButton: {
    backgroundColor: "#4361ee",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  selectButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
