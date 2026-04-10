import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  Dimensions,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const AuthFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const animatedHeights = useRef<{ [key: number]: Animated.Value }>({}).current;

  const faqs = [
    {
      icon: "chart-line",
      question: "How does your CRM improve sales performance?",
      answer:
        "Our CRM provides real-time analytics, automated workflows, and customer engagement tools that help sales teams close deals 30% faster. The platform tracks all interactions and provides AI-powered insights.",
    },
    {
      icon: "rupee-sign",
      question: "What pricing plans are available?",
      answer:
        "₹1,000/year only for Admin (Starter Plan) and ₹500/employee/year for Premium Plan. All plans include a 14-day free trial with no credit card required.",
    },
    {
      icon: "users",
      question: "How many users can access the CRM?",
      answer:
        "You can add unlimited users to any plan. We charge per active user, so you only pay for team members who need regular access to the system. This helps you scale your costs as your team grows.",
    },
    {
      icon: "shield-alt",
      question: "Is my data secure with your CRM?",
      answer:
        "Absolutely. We use enterprise-grade 256-bit encryption, regular backups, and SOC 2 Type II certified data centers to ensure your information is always protected. Your data is never shared with third parties.",
    },
    {
      icon: "cog",
      question: "How difficult is it to migrate from another CRM?",
      answer:
        "Our migration team handles everything for you. We support seamless imports from all major CRM platforms with guaranteed data integrity. The process typically takes 2-3 business days.",
    },
    {
      icon: "envelope",
      question: "What support options are available?",
      answer:
        "All plans include 24/5 email support. Professional and Enterprise plans add live chat and phone support with dedicated account managers. Average response time is under 2 hours.",
    },
  ];

  const toggleFAQ = (index: number) => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      delete: {
        duration: 200,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      create: {
        duration: 200,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <MaterialIcons name="help-outline" size={18} color="#4361ee" />
          <Text style={styles.headerBadgeText}>FAQ</Text>
        </View>
        <Text style={styles.headerTitle}>
          Frequently Asked{"\n"}
          <Text style={styles.headerHighlight}>Questions</Text>
        </Text>
        <Text style={styles.headerSubtitle}>
          Find answers to common questions about our CRM platform
        </Text>
      </View>

      {/* FAQ List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <View
              key={index}
              style={[
                styles.faqItem,
                activeIndex === index && styles.activeFaqItem,
              ]}
            >
              <TouchableOpacity
                style={styles.faqQuestion}
                onPress={() => toggleFAQ(index)}
                activeOpacity={0.7}
              >
                <View style={styles.faqIcon}>
                  <Icon name={faq.icon} size={20} color="#4361ee" solid />
                </View>
                <Text style={styles.faqQuestionText} numberOfLines={2}>
                  {faq.question}
                </Text>
                <View style={styles.faqToggle}>
                  <Animated.View
                    style={[
                      styles.toggleCircle,
                      {
                        transform: [
                          {
                            rotate: activeIndex === index ? "180deg" : "0deg",
                          },
                        ],
                      },
                    ]}
                  >
                    <Icon name="chevron-down" size={14} color="#4361ee" solid />
                  </Animated.View>
                </View>
              </TouchableOpacity>

              {activeIndex === index && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
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
    paddingBottom: 24,
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
  scrollContent: {
    paddingBottom: 32,
  },
  faqContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  faqItem: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  activeFaqItem: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  faqQuestion: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  faqIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    lineHeight: 20,
  },
  faqToggle: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F0F4FF",
    justifyContent: "center",
    alignItems: "center",
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  faqAnswerText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
  },
});
