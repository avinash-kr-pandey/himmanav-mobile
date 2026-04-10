import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const AuthFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const features = [
    {
      title: "Sales Engagements",
      icon: "handshake",
      description:
        "Track every customer interaction from first contact to final sale with our comprehensive engagement tools.",
      keyFeatures: [
        "Interaction Tracking",
        "Deal Stages",
        "Meeting Notes",
        "Follow-up Reminders",
      ],
      details: [
        "Log every customer touchpoint for complete visibility",
        "Visualize deals moving through your pipeline",
        "Record and access discussion points easily",
        "Never miss an important follow-up",
      ],
    },
    {
      title: "Team Productivity",
      icon: "users",
      description:
        "Boost your team's efficiency with collaborative tools and performance tracking metrics.",
      keyFeatures: [
        "Performance Dashboards",
        "Goal Setting",
        "Collaboration Spaces",
        "Time Tracking",
      ],
      details: [
        "Monitor individual and team metrics in real-time",
        "Set and track measurable objectives",
        "Dedicated areas for team projects",
        "Analyze how time is spent effectively",
      ],
    },
    {
      title: "Sales AI",
      icon: "robot",
      description:
        "Our AI analyzes patterns to suggest optimal times for customer follow-ups and deal closures.",
      keyFeatures: [
        "Predictive Analytics",
        "Smart Recommendations",
        "Pattern Recognition",
        "Automated Insights",
      ],
      details: [
        "Forecast sales trends with high accuracy",
        "Get AI-powered suggestions for next steps",
        "Identify winning strategies automatically",
        "Receive regular automated performance reports",
      ],
    },
    {
      title: "Buyer Engagement",
      icon: "chart-line",
      description:
        "Monitor buyer behavior and tailor your approach with real-time engagement analytics.",
      keyFeatures: [
        "Behavior Tracking",
        "Engagement Scoring",
        "Personalization Tools",
        "Content Interaction",
      ],
      details: [
        "See how buyers interact with your content",
        "Prioritize hot leads effectively",
        "Tailor communications for each buyer",
        "Understand what content resonates best",
      ],
    },
    {
      title: "Sales Analytics",
      icon: "chart-bar",
      description:
        "Powerful dashboards provide actionable insights into your sales pipeline and performance.",
      keyFeatures: [
        "Custom Reports",
        "Pipeline Visualization",
        "KPI Tracking",
        "Export Options",
      ],
      details: [
        "Build reports that matter to your business",
        "See your entire sales funnel at a glance",
        "Monitor key metrics in real-time",
        "Share data easily with your team",
      ],
    },
  ];

  const handleFeatureChange = (index: number) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    setActiveFeature(index);

    // Scroll to make active tab visible
    scrollViewRef.current?.scrollTo({
      x: index * 110,
      animated: true,
    });
  };

  const handleNext = () => {
    if (activeFeature < features.length - 1) {
      handleFeatureChange(activeFeature + 1);
    } else {
      handleFeatureChange(0);
    }
  };

  const handlePrev = () => {
    if (activeFeature > 0) {
      handleFeatureChange(activeFeature - 1);
    } else {
      handleFeatureChange(features.length - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Highlight */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <MaterialIcons name="stars" size={18} color="#4361ee" />
          <Text style={styles.headerBadgeText}>Why Choose Us</Text>
        </View>
        <Text style={styles.headerTitle}>
          Powerful Features to{"\n"}
          <Text style={styles.headerHighlight}>Scale Your Business</Text>
        </Text>
        <Text style={styles.headerSubtitle}>
          Discover tools that transform your sales process
        </Text>
      </View>

      {/* Feature Tabs with Better Active State */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeFeature === index && styles.tabActive]}
            onPress={() => handleFeatureChange(index)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.tabIconWrapper,
                activeFeature === index && styles.tabIconWrapperActive,
              ]}
            >
              <Icon
                name={feature.icon}
                size={18}
                color={activeFeature === index ? "#4361ee" : "#6B7280"}
                solid
              />
            </View>
            <Text
              style={[
                styles.tabText,
                activeFeature === index && styles.tabTextActive,
              ]}
            >
              {feature.title}
            </Text>
            {activeFeature === index && (
              <View style={styles.tabActiveIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Feature Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Description */}
        <Text style={styles.description}>
          {features[activeFeature].description}
        </Text>

        {/* Key Features Grid */}
        <View style={styles.featuresGrid}>
          {features[activeFeature].keyFeatures.map((feature, idx) => (
            <View key={idx} style={styles.featureCard}>
              <View style={styles.featureCardIcon}>
                <Icon name="check-circle" size={18} color="#4361ee" solid />
              </View>
              <View style={styles.featureCardContent}>
                <Text style={styles.featureCardTitle}>{feature}</Text>
                <Text style={styles.featureCardDetail}>
                  {features[activeFeature].details[idx]}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Navigation Controls */}
        <View style={styles.navigationContainer}>
          {/* Previous Button */}
          <TouchableOpacity
            style={styles.navButton}
            onPress={handlePrev}
            activeOpacity={0.7}
          >
            <Icon name="chevron-left" size={20} color="#4361ee" solid />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          {/* Slide Indicators */}
          <View style={styles.indicators}>
            {features.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  activeFeature === index && styles.indicatorActive,
                ]}
                onPress={() => handleFeatureChange(index)}
              />
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonText}>Next</Text>
            <Icon name="chevron-right" size={20} color="#4361ee" solid />
          </TouchableOpacity>
        </View>

        {/* Progress Text */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {activeFeature + 1} of {features.length} Features
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "ios" ? 20 : 24,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4FF",
    paddingHorizontal: 14,
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
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  headerHighlight: {
    color: "#4361ee",
    position: "relative",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  tabsContainer: {
    marginBottom: 28,
  },
  tabsContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  tab: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    minWidth: 100,
    position: "relative",
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#4361ee",
    borderWidth: 2,
    shadowColor: "#4361ee",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: Platform.OS === "android" ? 3 : 2,
  },
  tabIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tabIconWrapperActive: {
    backgroundColor: "#F0F4FF",
    borderColor: "#4361ee",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6B7280",
  },
  tabTextActive: {
    color: "#4361ee",
    fontWeight: "600",
  },
  tabActiveIndicator: {
    position: "absolute",
    bottom: -2,
    left: "50%",
    marginLeft: -15,
    width: 30,
    height: 3,
    backgroundColor: "#4361ee",
    borderRadius: 1.5,
  },
  content: {
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 24,
    marginBottom: 28,
    textAlign: "center",
  },
  featuresGrid: {
    gap: 16,
    marginBottom: 32,
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  featureCardIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  featureCardContent: {
    flex: 1,
  },
  featureCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  featureCardDetail: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  navButtonText: {
    fontSize: 13,
    color: "#4361ee",
    fontWeight: "500",
  },
  indicators: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
  },
  indicatorActive: {
    width: 24,
    backgroundColor: "#4361ee",
  },
  progressContainer: {
    alignItems: "center",
  },
  progressText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
});
