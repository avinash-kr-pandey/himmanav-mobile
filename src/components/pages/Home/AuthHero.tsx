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
        return <Icon name="users" size={24} color={iconColor} />;
      case "store":
        return <Icon name="store" size={24} color={iconColor} />;
      case "star":
        return <Icon name="star" size={24} color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.statItem}>
      <View style={styles.statIconWrapper}>{renderIcon()}</View>
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

  // Only images - no video
  const slides = [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=500&fit=crop",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1551434678-e076c2236a9a?w=500&h=500&fit=crop",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <ScrollView
        style={styles.heroSection}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSectionInner}>
          <View style={styles.leftSection}>
            <View style={styles.heroTag}>
              <Icon name="globe" size={14} color="#4361ee" />
              <Text style={styles.heroTagText}>
                Trusted by 5,000+ Indian Businesses
              </Text>
            </View>
            <Text style={styles.heroTitle}>
              Smart Business Management for {"\n"}
              Small Vendors & Growing Businesses
            </Text>
            <Text style={styles.heroSubtitle}>
              Take control of your daily operations with one easy-to-use
              platform.{"\n"}- Track and manage expenses effortlessly{"\n"}-
              Handle HR tasks without the hassle{"\n"}- Organize meetings,
              tasks, and documents in one place{"\n"}- Automate routine work to
              save time and avoid mistakes
            </Text>
            <View style={styles.heroButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setIsDemoOpen(true)}
              >
                <Text style={styles.buttonText}>Schedule A Demo</Text>
                <Icon name="calendar-alt" size={16} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Connect With Us</Text>
                <Icon name="telegram-plane" size={16} color="#4361ee" />
              </TouchableOpacity>
            </View>
            <View style={styles.heroStats}>
              <Counter
                endValue={10000}
                duration={2}
                label="Active Users"
                suffix="+"
                icon="users"
                color="#22C55E"
              />
              <Counter
                endValue={5000}
                duration={2}
                label="Businesses"
                icon="store"
                color="#3B82F6"
              />
              <Counter
                endValue={95}
                duration={2}
                label="Customer Satisfaction"
                suffix="%"
                icon="star"
                color="#F59E0B"
              />
            </View>
          </View>

          <View style={styles.rightSection}>
            <Animated.View
              style={{ opacity: fadeAnim, width: "100%", alignItems: "center" }}
            >
              <Image
                source={{ uri: slides[activeSlide].src }}
                style={styles.slideMedia}
                resizeMode="contain"
              />
            </Animated.View>
            <View style={styles.sliderDots}>
              {slides.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dot,
                    index === activeSlide && styles.activeDot,
                  ]}
                  onPress={() => setActiveSlide(index)}
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
    backgroundColor: "#f8f9fa",
    flex: 1,
  },
  heroSectionInner: {
    padding: 20,
  },
  leftSection: {
    marginBottom: 30,
  },
  heroTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f0fe",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  heroTagText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#4361ee",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 16,
    lineHeight: 38,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginBottom: 24,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
    flexWrap: "wrap",
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4361ee",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4361ee",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  secondaryButtonText: {
    color: "#4361ee",
    fontWeight: "600",
  },
  heroStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIconWrapper: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  rightSection: {
    alignItems: "center",
  },
  slideMedia: {
    width: width - 40,
    height: 250,
    borderRadius: 12,
  },
  sliderDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
  },
  activeDot: {
    width: 24,
    backgroundColor: "#4361ee",
  },
});
