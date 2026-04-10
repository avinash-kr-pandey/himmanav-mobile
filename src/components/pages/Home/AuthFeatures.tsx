import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const AuthFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Sales Engagements",
      icon: <Icon name="handshake" size={20} color="#4361ee" />,
      content:
        "Track every customer interaction from first contact to final sale with our comprehensive engagement tools.",
      keyFeatures: [
        {
          icon: <Icon name="tasks" size={16} color="#22C55E" />,
          title: "Interaction Tracking",
          description: "Log every customer touchpoint for complete visibility",
        },
        {
          icon: <Icon name="file-alt" size={16} color="#22C55E" />,
          title: "Deal Stages",
          description: "Visualize deals moving through your pipeline",
        },
        {
          icon: <Icon name="comments" size={16} color="#22C55E" />,
          title: "Meeting Notes",
          description: "Record and access discussion points easily",
        },
        {
          icon: <Icon name="sync-alt" size={16} color="#22C55E" />,
          title: "Follow-up Reminders",
          description: "Never miss an important follow-up",
        },
      ],
    },
    {
      title: "Team Productivity",
      icon: <Icon name="users" size={20} color="#4361ee" />,
      content:
        "Boost your team's efficiency with collaborative tools and performance tracking metrics.",
      keyFeatures: [
        {
          icon: <Icon name="tasks" size={16} color="#22C55E" />,
          title: "Performance Dashboards",
          description: "Monitor individual and team metrics",
        },
        {
          icon: <Icon name="file-alt" size={16} color="#22C55E" />,
          title: "Goal Setting",
          description: "Set and track measurable objectives",
        },
        {
          icon: <Icon name="comments" size={16} color="#22C55E" />,
          title: "Collaboration Spaces",
          description: "Dedicated areas for team projects",
        },
        {
          icon: <Icon name="sync-alt" size={16} color="#22C55E" />,
          title: "Time Tracking",
          description: "Analyze how time is spent",
        },
      ],
    },
    {
      title: "Sales AI",
      icon: <Icon name="robot" size={20} color="#4361ee" />,
      content:
        "Our AI analyzes patterns to suggest optimal times for customer follow-ups and deal closures.",
      keyFeatures: [
        {
          icon: <Icon name="tasks" size={16} color="#22C55E" />,
          title: "Predictive Analytics",
          description: "Forecast sales trends accurately",
        },
        {
          icon: <Icon name="file-alt" size={16} color="#22C55E" />,
          title: "Smart Recommendations",
          description: "Get AI-powered suggestions",
        },
        {
          icon: <Icon name="comments" size={16} color="#22C55E" />,
          title: "Pattern Recognition",
          description: "Identify winning strategies",
        },
        {
          icon: <Icon name="sync-alt" size={16} color="#22C55E" />,
          title: "Automated Insights",
          description: "Receive regular performance reports",
        },
      ],
    },
    {
      title: "Buyer Engagement",
      icon: <Icon name="chart-line" size={20} color="#4361ee" />,
      content:
        "Monitor buyer behavior and tailor your approach with real-time engagement analytics.",
      keyFeatures: [
        {
          icon: <Icon name="tasks" size={16} color="#22C55E" />,
          title: "Behavior Tracking",
          description: "See how buyers interact",
        },
        {
          icon: <Icon name="file-alt" size={16} color="#22C55E" />,
          title: "Engagement Scoring",
          description: "Prioritize hot leads",
        },
        {
          icon: <Icon name="comments" size={16} color="#22C55E" />,
          title: "Personalization Tools",
          description: "Tailor communications",
        },
        {
          icon: <Icon name="sync-alt" size={16} color="#22C55E" />,
          title: "Content Interaction",
          description: "See what content resonates",
        },
      ],
    },
    {
      title: "Sales Analytics",
      icon: <Icon name="chart-bar" size={20} color="#4361ee" />,
      content:
        "Powerful dashboards provide actionable insights into your sales pipeline and performance.",
      keyFeatures: [
        {
          icon: <Icon name="tasks" size={16} color="#22C55E" />,
          title: "Custom Reports",
          description: "Build reports that matter to you",
        },
        {
          icon: <Icon name="file-alt" size={16} color="#22C55E" />,
          title: "Pipeline Visualization",
          description: "See your entire sales funnel",
        },
        {
          icon: <Icon name="comments" size={16} color="#22C55E" />,
          title: "KPI Tracking",
          description: "Monitor key metrics",
        },
        {
          icon: <Icon name="sync-alt" size={16} color="#22C55E" />,
          title: "Export Options",
          description: "Share data easily",
        },
      ],
    },
  ];

  return (
    <View style={styles.featuresSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          <MaterialIcons name="emoji-events" size={20} color="#4361ee" /> Our
          Features
        </Text>
        <Text style={styles.sectionSubtitle}>
          Discover the tools that will transform your sales process and customer
          relationships
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuresTabs}
      >
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.featureTab,
              activeFeature === index && styles.activeFeatureTab,
            ]}
            onPress={() => setActiveFeature(index)}
          >
            <View style={styles.tabIcon}>{feature.icon}</View>
            <Text
              style={[
                styles.tabText,
                activeFeature === index && styles.activeTabText,
              ]}
            >
              {feature.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.featuresContent}>
        <View style={styles.featureHero}>
          <Text style={styles.featureHeroTitle}>
            {features[activeFeature].title}{" "}
            <MaterialIcons name="emoji-events" size={20} color="#4361ee" />
          </Text>
          <Text style={styles.featureHeroDescription}>
            {features[activeFeature].content}
          </Text>
        </View>

        <View style={styles.featureDetails}>
          <Text style={styles.featureDetailsTitle}>
            Key Features: <MaterialIcons name="key" size={20} color="#4361ee" />
          </Text>
          {features[activeFeature].keyFeatures.map((feature, index) => (
            <View key={index} style={styles.keyFeatureItem}>
              <View style={styles.keyFeatureIcon}>{feature.icon}</View>
              <View style={styles.keyFeatureText}>
                <Text style={styles.keyFeatureTitle}>{feature.title}:</Text>
                <Text style={styles.keyFeatureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  featuresSection: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: 24,
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
  featuresTabs: {
    flexDirection: "row",
    marginBottom: 24,
  },
  featureTab: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    minWidth: 100,
  },
  activeFeatureTab: {
    backgroundColor: "#4361ee",
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    color: "#666",
  },
  activeTabText: {
    color: "#fff",
  },
  featuresContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  featureHero: {
    marginBottom: 24,
  },
  featureHeroTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 12,
  },
  featureHeroDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  featureDetails: {
    marginTop: 8,
  },
  featureDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 16,
  },
  keyFeatureItem: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
  },
  keyFeatureIcon: {
    marginTop: 2,
  },
  keyFeatureText: {
    flex: 1,
  },
  keyFeatureTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  keyFeatureDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
});
