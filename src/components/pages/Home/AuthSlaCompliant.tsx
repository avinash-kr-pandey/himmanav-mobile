import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  Animated,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");

export const AuthSlaCompliant = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const features = [
    {
      icon: <MaterialIcons name="emoji-events" size={28} color="#4361ee" />,
      title: "Commitment You Can Trust",
      description:
        "We're not just another supply chain company; we stick to our promises and deliver exactly what we commit to.",
      badges: ["Reliable", "Trustworthy"],
      stats: [
        { value: "99.9%", label: "Uptime" },
        { value: "24/7", label: "Support" },
      ],
    },
    {
      icon: <Icon name="activity" size={28} color="#4361ee" />,
      title: "Clear SLAs",
      description:
        "Our work is guided by clear service agreements (SLAs), so you always know what to expect and we make sure to deliver on time, every time.",
      badges: ["OnTime", "Transparent"],
      stats: [
        { value: "100%", label: "Compliance" },
        { value: "24/7", label: "Monitoring" },
      ],
    },
    {
      icon: <Icon name="microchip" size={28} color="#4361ee" />,
      title: "Performance & Technology",
      description:
        "With the right mix of performance and technology, we make your supply chain smooth, efficient, and stress-free.",
      badges: ["Efficient", "SmartTech"],
      stats: [
        { value: "10x", label: "Faster" },
        { value: "99%", label: "Accuracy" },
      ],
    },
  ];

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (width - 40));
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < features.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * (width - 40 + 16),
        animated: true,
      });
    } else {
      scrollViewRef.current?.scrollTo({ x: 0, animated: true });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex - 1) * (width - 40 + 16),
        animated: true,
      });
    } else {
      scrollViewRef.current?.scrollTo({
        x: (features.length - 1) * (width - 40 + 16),
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Icon name="shield-alt" size={14} color="#4361ee" solid />
          <Text style={styles.headerBadgeText}>SLA Compliant</Text>
        </View>
        <Text style={styles.headerTitle}>
          Supply Chain{"\n"}
          <Text style={styles.headerHighlight}>Solutions You Can Trust</Text>
        </Text>
        <Text style={styles.headerSubtitle}>
          Our commitment to service level agreements ensures reliable and
          measurable performance
        </Text>
      </View>

      {/* Swipe Hint */}
      <View style={styles.swipeHint}>
        <Icon name="hand-peace" size={16} color="#9CA3AF" solid />
        <Text style={styles.swipeHintText}>Swipe to explore features</Text>
        <Icon name="arrow-right" size={14} color="#9CA3AF" solid />
      </View>

      {/* Features Scroll */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.featuresContainer}
        contentContainerStyle={styles.featuresContent}
        pagingEnabled
        snapToInterval={width - 40 + 16}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {features.map((feature, idx) => (
          <View key={idx} style={styles.featureCard}>
            {/* Icon Section */}
            <View style={styles.iconSection}>
              <View style={styles.iconWrapper}>{feature.icon}</View>
            </View>

            {/* Content Section */}
            <View style={styles.contentSection}>
              <Text style={styles.title}>{feature.title}</Text>
              <Text style={styles.description}>{feature.description}</Text>

              {/* Badges */}
              <View style={styles.badgesContainer}>
                {feature.badges.map((badge, i) => (
                  <View key={i} style={styles.badge}>
                    <Icon name="hashtag" size={10} color="#4361ee" />
                    <Text style={styles.badgeText}>{badge}</Text>
                  </View>
                ))}
              </View>

              {/* Stats */}
              <View style={styles.statsContainer}>
                {feature.stats.map((stat, i) => (
                  <View key={i} style={styles.statItem}>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Navigation Arrows */}
      <View style={styles.navigationArrows}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handlePrev}
          activeOpacity={0.7}
        >
          <Icon name="chevron-left" size={20} color="#4361ee" solid />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <Icon name="chevron-right" size={20} color="#4361ee" solid />
        </TouchableOpacity>
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {features.map((_, idx) => {
          const inputRange = [
            (idx - 1) * (width - 40 + 16),
            idx * (width - 40 + 16),
            (idx + 1) * (width - 40 + 16),
          ];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [6, 24, 6],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={idx}
              style={[styles.paginationDot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>

      {/* Current Card Indicator */}
      <View style={styles.cardIndicator}>
        <Text style={styles.cardIndicatorText}>
          {currentIndex + 1} of {features.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: width,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 20 : 24,
    paddingBottom: 16,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4FF",
    paddingHorizontal: 12,
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
    fontSize: Platform.OS === "ios" ? 32 : 28,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: Platform.OS === "ios" ? 40 : 36,
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
  swipeHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    marginBottom: 8,
  },
  swipeHintText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  featuresContainer: {
    marginTop: 8,
  },
  featuresContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  featureCard: {
    width: width - 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconSection: {
    backgroundColor: "#F9FAFB",
    paddingVertical: 32,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  contentSection: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
    lineHeight: 28,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 20,
  },
  badgesContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    color: "#4361ee",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  navigationArrows: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
  paginationDot: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4361ee",
  },
  cardIndicator: {
    alignItems: "center",
    paddingBottom: 24,
  },
  cardIndicatorText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
});
