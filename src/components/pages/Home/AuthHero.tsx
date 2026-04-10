import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  ScrollView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScheduleDemo } from "./ScheduleDemo";

const { width } = Dimensions.get("window");

interface CounterProps {
  endValue: number;
  duration: number;
  label: string;
  suffix?: string;
  icon?: "users" | "store" | "star";
  color?: string;
}

const Counter = ({
  endValue,
  duration,
  label,
  suffix = "",
  icon,
  color,
}: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [endValue, duration]);

  const renderIcon = () => {
    const iconColor = color || "#4361ee";
    switch (icon) {
      case "users":
        return <Icon name="users" size={20} color={iconColor} solid />;
      case "store":
        return <Icon name="store" size={20} color={iconColor} solid />;
      case "star":
        return <Icon name="star" size={20} color={iconColor} solid />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.statItem}>
      <View style={[styles.statIconWrapper, { backgroundColor: `${color}10` }]}>
        {renderIcon()}
      </View>
      <Text style={styles.statNumber}>
        {count.toLocaleString()}
        {suffix}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

export const AuthHero = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const slides = [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=600&fit=crop",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1551434678-e076c2236a9a?w=600&h=600&fit=crop",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: "wallet",
      text: "Track and manage expenses effortlessly",
      color: "#22C55E",
    },
    {
      icon: "users",
      text: "Handle HR tasks without the hassle",
      color: "#3B82F6",
    },
    {
      icon: "calendar-check",
      text: "Organize meetings, tasks, and documents",
      color: "#F59E0B",
    },
    {
      icon: "robot",
      text: "Automate routine work to save time",
      color: "#8B5CF6",
    },
  ];

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={styles.heroSection}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        <View style={styles.heroSectionInner}>
          <View style={styles.leftSection}>
            {/* Trust Badge */}
            <View style={styles.heroTag}>
              <Icon name="globe" size={12} color="#4361ee" solid />
              <Text style={styles.heroTagText}>
                Trusted by 5,000+ Indian Businesses
              </Text>
            </View>

            {/* Title */}
            <Text style={styles.heroTitle}>
              Smart Business Management for{" "}
              <Text style={styles.highlightText}>Small Vendors</Text> &{" "}
              <Text style={styles.highlightText}>Growing Businesses</Text>
            </Text>

            {/* Subtitle */}
            <Text style={styles.heroSubtitle}>
              Take control of your daily operations with one easy-to-use
              platform.
            </Text>

            {/* Features Grid - 2 columns on larger screens */}
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View
                    style={[
                      styles.featureIcon,
                      { backgroundColor: `${feature.color}15` },
                    ]}
                  >
                    <Icon
                      name={feature.icon}
                      size={16}
                      color={feature.color}
                      solid
                    />
                  </View>
                  <Text style={styles.featureText}>{feature.text}</Text>
                </View>
              ))}
            </View>

            {/* Buttons */}
            <View style={styles.heroButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setIsDemoOpen(true)}
                activeOpacity={0.8}
              >
                <Icon name="calendar-alt" size={14} color="#fff" solid />
                <Text style={styles.buttonText}>Schedule A Demo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.8}
              >
                <Text style={styles.secondaryButtonText}>Connect With Us</Text>
                <Icon name="telegram-plane" size={14} color="#4361ee" solid />
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Stats */}
            <View style={styles.heroStats}>
              <Counter
                endValue={10000}
                duration={2}
                label="Active Users"
                suffix="+"
                icon="users"
                color="#22C55E"
              />
              <View style={styles.statDivider} />
              <Counter
                endValue={5000}
                duration={2}
                label="Businesses"
                icon="store"
                color="#3B82F6"
              />
              <View style={styles.statDivider} />
              <Counter
                endValue={95}
                duration={2}
                label="Satisfaction"
                suffix="%"
                icon="star"
                color="#F59E0B"
              />
            </View>
          </View>

          {/* Right Section - Image Slider */}
          <View style={styles.rightSection}>
            <View style={styles.imageContainer}>
              <Animated.View style={{ opacity: fadeAnim }}>
                <Image
                  source={{ uri: slides[activeSlide].src }}
                  style={styles.slideMedia}
                  resizeMode="cover"
                  progressiveRenderingEnabled={true}
                />
              </Animated.View>

              {/* Optional: Image overlay gradient for better text visibility */}
              <View style={styles.imageOverlay} pointerEvents="none" />
            </View>

            {/* Slider Dots */}
            <View style={styles.sliderDots}>
              {slides.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dot,
                    index === activeSlide && styles.activeDot,
                  ]}
                  onPress={() => setActiveSlide(index)}
                  activeOpacity={0.6}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <ScheduleDemo visible={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  heroSectionInner: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 20 : 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 32,
  },
  leftSection: {
    marginBottom: 32,
  },
  heroTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  heroTagText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#4361ee",
    fontWeight: "500",
  },
  heroTitle: {
    fontSize: Platform.OS === "ios" ? 32 : 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    lineHeight: Platform.OS === "ios" ? 42 : 38,
    letterSpacing: -0.5,
  },
  highlightText: {
    color: "#4361ee",
    position: "relative",
  },
  heroSubtitle: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 24,
    marginBottom: 24,
  },
  featuresGrid: {
    marginBottom: 32,
    gap: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    fontSize: 14,
    color: "#4B5563",
    flex: 1,
    lineHeight: 20,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4361ee",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#4361ee",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  secondaryButtonText: {
    color: "#4361ee",
    fontWeight: "600",
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 24,
  },
  heroStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E7EB",
  },
  rightSection: {
    alignItems: "center",
    marginTop: 8,
  },
  imageContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  slideMedia: {
    width: width - 40,
    height: 280,
  },
  sliderDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
  },
  activeDot: {
    width: 24,
    backgroundColor: "#4361ee",
  },
});
