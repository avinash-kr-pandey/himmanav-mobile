import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  homeimg1,
  homeimg2,
  featurecardimg1,
  featurecardimg2,
} from "../../../assets/useImage";

export const AuthSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Run Your Business in One Simple Dashboard",
      description:
        "From customers to expenses and HR, manage your daily business tasks with ease. Our simple dashboard saves you time, reduces errors, and keeps everything running smoothly. Organize all your operations in one place and get real-time updates for faster decisions.",
      icon: <Icon name="shield-alt" size={24} color="#4361ee" />,
      showcase: homeimg1,
      features: [
        {
          icon: <Icon name="shield-alt" size={16} color="#22C55E" />,
          text: "Save Time with Smart Automation",
        },
        {
          icon: <Icon name="chart-line" size={16} color="#22C55E" />,
          text: "Track KPIs in Real-Time",
        },
        {
          icon: <Icon name="users" size={16} color="#22C55E" />,
          text: "CRM Automation & Follow-ups",
        },
        {
          icon: <Icon name="clock" size={16} color="#22C55E" />,
          text: "Schedule Tasks Efficiently",
        },
      ],
    },
    {
      id: 2,
      title: "Real-time KPIs and Analytics",
      description:
        "Get actionable insights with our powerful analytics tools to track performance and customer behavior. Make data-driven decisions and optimize your workflow for maximum efficiency and growth.",
      icon: <Icon name="chart-line" size={24} color="#4361ee" />,
      showcase: homeimg2,
      features: [
        {
          icon: <Icon name="chart-line" size={16} color="#22C55E" />,
          text: "Monitor KPIs Instantly",
        },
        {
          icon: <Icon name="shield-alt" size={16} color="#22C55E" />,
          text: "Prevent Errors with Alerts",
        },
        {
          icon: <Icon name="clock" size={16} color="#22C55E" />,
          text: "Time-based Performance Reports",
        },
      ],
    },
    {
      id: 3,
      title: "Customer Relationship Management",
      description:
        "Build stronger relationships with automated follow-ups, personalized communication, and 360° customer views. Never miss a touchpoint with your clients and enhance satisfaction with every interaction.",
      icon: <Icon name="users" size={24} color="#4361ee" />,
      showcase: featurecardimg1,
      features: [
        {
          icon: <Icon name="users" size={16} color="#22C55E" />,
          text: "Automated Customer Follow-ups",
        },
        {
          icon: <Icon name="chart-line" size={16} color="#22C55E" />,
          text: "Insightful Customer Analytics",
        },
        {
          icon: <Icon name="shield-alt" size={16} color="#22C55E" />,
          text: "Secure Data Management",
        },
      ],
    },
    {
      id: 4,
      title: "Automated Workflows",
      description:
        "Save time with intelligent automation that handles repetitive tasks and ensures timely customer responses. Streamline your daily operations and focus on high-impact activities that grow your business.",
      icon: <Icon name="clock" size={24} color="#4361ee" />,
      showcase: featurecardimg2,
      features: [
        {
          icon: <Icon name="clock" size={16} color="#22C55E" />,
          text: "Smart Task Automation",
        },
        {
          icon: <Icon name="chart-line" size={16} color="#22C55E" />,
          text: "Performance Tracking",
        },
        {
          icon: <Icon name="shield-alt" size={16} color="#22C55E" />,
          text: "Error Reduction Tools",
        },
      ],
    },
  ];

  return (
    <View style={styles.sliderSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          <Icon name="th" size={20} color="#4361ee" /> Smart Tools to Help Small
          Businesses Grow
        </Text>
        <Text style={styles.sectionSubtitle}>
          Everything you need to manage customer relationships in one powerful
          system
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.iconLine}
      >
        {slides.map((slide, index) => (
          <TouchableOpacity
            key={slide.id}
            style={[
              styles.iconItem,
              currentSlide === index && styles.activeIconItem,
            ]}
            onPress={() => setCurrentSlide(index)}
          >
            <View
              style={[
                styles.iconCircle,
                currentSlide === index && styles.activeIconCircle,
              ]}
            >
              {slide.icon}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sliderContentSection}>
        <View style={styles.sliderImageContent}>
          <Image
            source={slides[currentSlide].showcase}
            style={styles.showcaseImage}
          />
        </View>
        <View style={styles.sliderTextContent}>
          <Text style={styles.sliderTitle}>{slides[currentSlide].title}</Text>
          <Text style={styles.sliderDescription}>
            {slides[currentSlide].description}
          </Text>
          {slides[currentSlide].features.map((feature, i) => (
            <View key={i} style={styles.featureItem}>
              {feature.icon}
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderSection: {
    padding: 20,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a2e",
    textAlign: "center",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  iconLine: {
    flexDirection: "row",
    marginBottom: 30,
  },
  iconItem: {
    marginRight: 16,
    padding: 8,
  },
  activeIconItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#4361ee",
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconCircle: {
    backgroundColor: "#e8f0fe",
  },
  sliderContentSection: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sliderImageContent: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
  },
  showcaseImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  sliderTextContent: {
    flex: 1,
  },
  sliderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 12,
  },
  sliderDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#333",
  },
});
