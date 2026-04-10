import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";


// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const AuthFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      icon: <Icon name="chart-line" size={18} color="#4361ee" />,
      question: "How does your CRM improve sales performance?",
      answer:
        "Our CRM provides real-time analytics, automated workflows, and customer engagement tools that help sales teams close deals 30% faster. The platform tracks all interactions and provides AI-powered insights.",
    },
    {
      icon: <Icon name="rupee-sign" size={18} color="#4361ee" />,
      question: "What pricing plans are available?",
      answer:
        "₹1,000/year only for Admin (Starter Plan) and ₹500/employee/year for Premium Plan.",
    },
    {
      icon: <Icon name="user" size={18} color="#4361ee" />,
      question: "How many users can access the CRM?",
      answer:
        "You can add unlimited users to any plan. We charge per active user, so you only pay for team members who need regular access to the system.",
    },
    {
      icon: <Icon name="shield-alt" size={18} color="#4361ee" />,
      question: "Is my data secure with your CRM?",
      answer:
        "Absolutely. We use enterprise-grade 256-bit encryption, regular backups, and SOC 2 Type II certified data centers to ensure your information is always protected.",
    },
    {
      icon: <Icon name="cog" size={18} color="#4361ee" />,
      question: "How difficult is it to migrate from another CRM?",
      answer:
        "Our migration team handles everything for you. We support seamless imports from all major CRM platforms with guaranteed data integrity.",
    },
    {
      icon: <Icon name="envelope" size={18} color="#4361ee" />,
      question: "What support options are available?",
      answer:
        "All plans include 24/5 email support. Professional and Enterprise plans add live chat and phone support with dedicated account managers.",
    },
  ];

  const toggleFAQ = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <View style={styles.faqSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          <MaterialIcons name="help-outline" size={20} color="#4361ee" />{" "}
          Frequently Asked Questions
        </Text>
        <Text style={styles.sectionSubtitle}>
          Find answers to common questions about our CRM platform
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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
                <View style={styles.faqIcon}>{faq.icon}</View>
                <Text style={styles.faqQuestionText}>{faq.question}</Text>
                <View style={styles.faqToggle}>
                  <View style={styles.toggleCircle}>
                    {activeIndex === index ? (
                      <Icon name="chevron-up" size={16} color="#4361ee" />
                    ) : (
                      <Icon name="chevron-down" size={16} color="#4361ee" />
                    )}
                  </View>
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
  faqSection: {
    padding: 20,
    backgroundColor: "#fff",
    paddingBottom: 40,
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
  faqContainer: {
    gap: 12,
  },
  faqItem: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    overflow: "hidden",
  },
  activeFaqItem: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  faqQuestion: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  faqIcon: {
    width: 32,
    alignItems: "center",
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#1a1a2e",
  },
  faqToggle: {
    width: 32,
    alignItems: "center",
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#e8f0fe",
    justifyContent: "center",
    alignItems: "center",
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  faqAnswerText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
