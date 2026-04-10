import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";


export const AuthWhyChoose = () => {
  const features = [
    {
      id: 1,
      title: "Agility",
      description:
        "Through Himmanav's advanced technology and adaptive solutions, we make your asset management agile",
      icon: <Icon name="chart-line" size={24} color="#4361ee" />,
    },
    {
      id: 2,
      title: "Elasticity",
      description:
        "Seamlessly scale your asset portfolio with our flexible management solutions",
      icon: <Icon name="truck" size={24} color="#4361ee" />,
    },
    {
      id: 3,
      title: "Accuracy",
      description:
        "Achieve 99%+ accuracy in asset tracking and valuation with our precision tools",
      icon: <Icon name="bullseye" size={24} color="#4361ee" />,
    },
    {
      id: 4,
      title: "Resilience",
      description:
        "Benefit from a resilient asset management system built on Himmanav's robust digital infrastructure",
      icon: <Icon name="shield-alt" size={24} color="#4361ee" />,
    },
    {
      id: 5,
      title: "Visibility",
      description:
        "Gain real-time visibility into your assets through our comprehensive dashboard and reporting tools",
      icon: <Icon name="eye" size={24} color="#4361ee" />,
    },
    {
      id: 6,
      title: "Accountability",
      description:
        "Streamlined accountability with integrated tracking and reporting for all your assets",
      icon: <Icon name="check-circle" size={24} color="#4361ee" />,
    },
  ];

  return (
    <View style={styles.whyChooseSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          <MaterialIcons name="inventory" size={20} color="#4361ee" /> Why
          Choose Us
        </Text>
        <Text style={styles.sectionSubtitle}>
          Why settle for fragmented asset management with multiple disconnected
          solutions when Himmanav offers a comprehensive, full-stack asset
          management platform.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.featuresGrid}>
          {features.map((feature) => (
            <View key={feature.id} style={styles.featureCard}>
              <Text style={styles.featureNumber}>
                {feature.id.toString().padStart(2, "0")}
              </Text>
              <View style={styles.featureIconTitle}>
                <View style={styles.featureIcon}>{feature.icon}</View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
              </View>
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
  whyChooseSection: {
    padding: 20,
    backgroundColor: "#fff",
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
    lineHeight: 20,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  featureNumber: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  featureIconTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e8f0fe",
    justifyContent: "center",
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a2e",
  },
  featureDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
});
