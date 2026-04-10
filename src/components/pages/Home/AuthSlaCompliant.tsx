import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";


export const AuthSlaCompliant = () => {
  const features = [
    {
      icon: <MaterialIcons name="emoji-events" size={24} color="#4361ee" />,
      title: "Commitment You Can Trust",
      description:
        "We're not just another supply chain company; we stick to our promises and deliver exactly what we commit to.",
      badges: ["# Reliable", "# Trustworthy"],
      miniIcons: [
        <Icon name="check-circle" size={14} color="#22C55E" key={1} />,
        <Icon name="shield-alt" size={14} color="#22C55E" key={2} />,
      ],
    },
    {
      icon: <Icon name="activity" size={24} color="#4361ee" />,
      title: "Clear SLAs",
      description:
        "Our work is guided by clear service agreements (SLAs), so you always know what to expect and we make sure to deliver on time, every time.",
      badges: ["# OnTime", "# Transparent"],
      miniIcons: [
        <Icon name="clock" size={14} color="#22C55E" key={1} />,
        <Icon name="shield-alt" size={14} color="#22C55E" key={2} />,
      ],
    },
    {
      icon: <Icon name="microchip" size={24} color="#4361ee" />,
      title: "Performance & Technology",
      description:
        "With the right mix of performance and technology, we make your supply chain smooth, efficient, and stress-free.",
      badges: ["# Efficient", "# SmartTech"],
      miniIcons: [
        <Icon name="cog" size={14} color="#22C55E" key={1} />,
        <Icon name="microchip" size={14} color="#22C55E" key={2} />,
      ],
    },
  ];

  return (
    <View style={styles.slaSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          <Icon name="shield-alt" size={20} color="#4361ee" /> SLA Compliant
          Supply Chain Solutions
        </Text>
        <Text style={styles.sectionSubtitle}>
          Our commitment to service level agreements ensures reliable and
          measurable performance
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.slaFeatures}
      >
        {features.map((feature, idx) => (
          <View key={idx} style={styles.slaFeature}>
            <View style={styles.slaIconWrapper}>{feature.icon}</View>
            <View style={styles.slaText}>
              <Text style={styles.slaTitle}>{feature.title}</Text>
              <Text style={styles.slaDescription}>{feature.description}</Text>
              <View style={styles.slaBadges}>
                {feature.badges.map((badge, i) => (
                  <View key={i} style={styles.slaBadge}>
                    <Text style={styles.slaBadgeText}>{badge}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.slaMiniIcons}>
                {feature.miniIcons.map((icon, i) => (
                  <View key={i} style={styles.miniIcon}>
                    {icon}
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.slaLine} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  slaSection: {
    padding: 20,
    backgroundColor: "#f8f9fa",
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
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  slaFeatures: {
    flexDirection: "row",
  },
  slaFeature: {
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
  slaIconWrapper: {
    marginBottom: 16,
  },
  slaText: {
    marginBottom: 16,
  },
  slaTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  slaDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  slaBadges: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  slaBadge: {
    backgroundColor: "#e8f0fe",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  slaBadgeText: {
    fontSize: 12,
    color: "#4361ee",
  },
  slaMiniIcons: {
    flexDirection: "row",
    gap: 8,
  },
  miniIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  slaLine: {
    height: 2,
    backgroundColor: "#e0e0e0",
    marginTop: 16,
  },
});
