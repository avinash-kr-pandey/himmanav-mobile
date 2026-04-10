import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { featurecardimg1, featurecardimg2 } from "../../../assets/useImage";
import { MaterialIcons } from "@expo/vector-icons";

export const AuthCrmManagement = () => {
  return (
    <View style={styles.crmSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          <MaterialIcons name="layers" size={20} color="#4361ee" /> CRM
          Management
        </Text>
        <Text style={styles.sectionSubtitle}>
          Powerful tools to streamline your customer relationships and business
          operations
        </Text>
      </View>

      <View style={styles.managementSection}>
        <View style={styles.managementShowcase}>
          <Image source={featurecardimg1} style={styles.showcaseImage} />
        </View>
        <View style={styles.managementContent}>
          <View style={styles.contentHeader}>
            <Icon name="users" size={40} color="#4361ee" />
            <Text style={styles.contentTitle}>
              Manage Your Clients Effectively
            </Text>
          </View>
          <View style={styles.contentPoints}>
            <View style={styles.pointItem}>
              <Icon name="check-circle" size={16} color="#22C55E" />
              <Text style={styles.pointText}>
                Keep all your client interactions, deals, and updates in one
                place.
              </Text>
            </View>
            <View style={styles.pointItem}>
              <Icon name="clock" size={16} color="#22C55E" />
              <Text style={styles.pointText}>
                Track sales progress in real-time and never miss a follow-up.
              </Text>
            </View>
            <View style={styles.pointItem}>
              <Icon name="activity" size={16} color="#22C55E" />
              <Text style={styles.pointText}>
                Give every customer fast, personalized service automatically.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.managementSection, styles.reverseSection]}>
        <View style={styles.managementContent}>
          <View style={styles.contentHeader}>
            <Icon name="chart-line" size={40} color="#4361ee" />
            <Text style={styles.contentTitle}>
              Enhance Operational Efficiency
            </Text>
          </View>
          <View style={styles.contentPoints}>
            <View style={styles.pointItem}>
              <Icon name="cog" size={16} color="#22C55E" />
              <Text style={styles.pointText}>
                Integrates all your tools into one seamless, easy-to-use
                dashboard.
              </Text>
            </View>
            <View style={styles.pointItem}>
              <Icon name="chart-bar" size={16} color="#22C55E" />
              <Text style={styles.pointText}>
                Simplifies daily operations for smoother and more efficient
                workflows.
              </Text>
            </View>
            <View style={styles.pointItem}>
              <Icon name="check-circle" size={16} color="#22C55E" />
              <Text style={styles.pointText}>
                Built-in analytics to track KPIs, gain insights, and drive smart
                decisions.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.managementShowcase}>
          <Image source={featurecardimg2} style={styles.showcaseImage} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  crmSection: {
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
  },
  managementSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 40,
    gap: 20,
  },
  reverseSection: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
  },
  managementShowcase: {
    flex: 1,
    alignItems: "center",
  },
  showcaseImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  managementContent: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
    flexWrap: "wrap",
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    flex: 1,
  },
  contentPoints: {
    gap: 12,
  },
  pointItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  pointText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    lineHeight: 20,
  },
});
