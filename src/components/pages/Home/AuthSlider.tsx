import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  homeimg1,
  homeimg2,
  featurecardimg1,
  featurecardimg2,
} from "../../../assets/useImage";

const { width } = Dimensions.get("window");

export const AuthSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const slides = [
    {
      id: 1,
      title: "Run Your Business in One Simple Dashboard",
      description:
        "From customers to expenses and HR, manage your daily business tasks with ease. Our simple dashboard saves you time, reduces errors, and keeps everything running smoothly.",
      icon: "shield-alt",
      showcase: homeimg1,
      features: [
        {
          icon: "bolt",
          text: "Save Time with Smart Automation",
          color: "#22C55E",
        },
        {
          icon: "chart-line",
          text: "Track KPIs in Real-Time",
          color: "#3B82F6",
        },
        {
          icon: "users",
          text: "CRM Automation & Follow-ups",
          color: "#F59E0B",
        },
        { icon: "clock", text: "Schedule Tasks Efficiently", color: "#8B5CF6" },
      ],
    },
    {
      id: 2,
      title: "Real-time KPIs and Analytics",
      description:
        "Get actionable insights with our powerful analytics tools to track performance and customer behavior. Make data-driven decisions and optimize your workflow for maximum efficiency.",
      icon: "chart-line",
      showcase: homeimg2,
      features: [
        {
          icon: "chart-line",
          text: "Monitor KPIs Instantly",
          color: "#22C55E",
        },
        {
          icon: "shield-alt",
          text: "Prevent Errors with Alerts",
          color: "#3B82F6",
        },
        {
          icon: "clock",
          text: "Time-based Performance Reports",
          color: "#F59E0B",
        },
      ],
    },
    {
      id: 3,
      title: "Customer Relationship Management",
      description:
        "Build stronger relationships with automated follow-ups, personalized communication, and 360° customer views. Never miss a touchpoint with your clients.",
      icon: "users",
      showcase: featurecardimg1,
      features: [
        {
          icon: "users",
          text: "Automated Customer Follow-ups",
          color: "#22C55E",
        },
        {
          icon: "chart-line",
          text: "Insightful Customer Analytics",
          color: "#3B82F6",
        },
        {
          icon: "shield-alt",
          text: "Secure Data Management",
          color: "#F59E0B",
        },
      ],
    },
    {
      id: 4,
      title: "Automated Workflows",
      description:
        "Save time with intelligent automation that handles repetitive tasks and ensures timely customer responses. Streamline your daily operations and focus on high-impact activities.",
      icon: "clock",
      showcase: featurecardimg2,
      features: [
        { icon: "clock", text: "Smart Task Automation", color: "#22C55E" },
        { icon: "chart-line", text: "Performance Tracking", color: "#3B82F6" },
        { icon: "shield-alt", text: "Error Reduction Tools", color: "#F59E0B" },
      ],
    },
  ];

  const handleSlideChange = (index: number) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    setCurrentSlide(index);
  };

  const renderFeatureIcon = (iconName: string, color: string) => {
    return <Icon name={iconName} size={14} color={color} solid />;
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerBadge}>
          <Icon name="th" size={14} color="#4361ee" solid />
          <Text style={styles.headerBadgeText}>Smart Solutions</Text>
        </View>
        <Text style={styles.headerTitle}>
          Everything You Need to{"\n"}
          <Text style={styles.headerHighlight}>Grow Your Business</Text>
        </Text>
        <Text style={styles.headerSubtitle}>
          Powerful tools to manage customer relationships and streamline
          operations
        </Text>
      </View>

      {/* Icon Navigation - No horizontal scroll needed now */}
      <View style={styles.navigationContainer}>
        {slides.map((slide, index) => (
          <TouchableOpacity
            key={slide.id}
            style={styles.navItem}
            onPress={() => handleSlideChange(index)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.navIconWrapper,
                currentSlide === index && styles.navIconWrapperActive,
              ]}
            >
              <Icon
                name={slide.icon}
                size={18}
                color={currentSlide === index ? "#4361ee" : "#9CA3AF"}
                solid
              />
            </View>
            <Text
              style={[
                styles.navLabel,
                currentSlide === index && styles.navLabelActive,
              ]}
            >
              {index === 0 && "Dashboard"}
              {index === 1 && "Analytics"}
              {index === 2 && "CRM"}
              {index === 3 && "Automation"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Content */}
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        {/* Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.imageWrapper}>
            <Image
              source={slides[currentSlide].showcase}
              style={styles.showcaseImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Text Content Section */}
        <View style={styles.textSection}>
          <Text style={styles.slideTitle}>{slides[currentSlide].title}</Text>
          <Text style={styles.slideDescription}>
            {slides[currentSlide].description}
          </Text>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            {slides[currentSlide].features.map((feature, idx) => (
              <View key={idx} style={styles.featureCard}>
                <View
                  style={[
                    styles.featureIconWrapper,
                    { backgroundColor: `${feature.color}10` },
                  ]}
                >
                  {renderFeatureIcon(feature.icon, feature.color)}
                </View>
                <Text style={styles.featureCardText}>{feature.text}</Text>
              </View>
            ))}
          </View>

          {/* Slide Indicators */}
          <View style={styles.indicators}>
            {slides.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  currentSlide === index && styles.indicatorActive,
                ]}
                onPress={() => handleSlideChange(index)}
              />
            ))}
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    paddingVertical: Platform.OS === "ios" ? 20 : 24,
  },
  headerSection: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 16,
    gap: 8,
  },
  headerBadgeText: {
    fontSize: 12,
    color: "#4361ee",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 12,
    letterSpacing: -0.5,
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
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  navIconWrapperActive: {
    backgroundColor: "#F0F4FF",
    borderColor: "#4361ee",
    borderWidth: 2,
  },
  navLabel: {
    fontSize: 10,
    color: "#6B7280",
    fontWeight: "500",
    textAlign: "center",
  },
  navLabelActive: {
    color: "#4361ee",
    fontWeight: "600",
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  imageSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  imageWrapper: {
    borderRadius: 24,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  showcaseImage: {
    width: width - 80,
    height: 200,
    backgroundColor: "#F9FAFB",
  },
  textSection: {
    flex: 1,
  },
  slideTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  slideDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 28,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 8,
    width: "48%",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  featureIconWrapper: {
    width: 26,
    height: 26,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  featureCardText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "500",
    flex: 1,
    lineHeight: 16,
  },
  indicators: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
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
});
