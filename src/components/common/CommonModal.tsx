import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { colors } from "../../constants/colors";

const { height, width } = Dimensions.get("window");

export interface ModalData {
  title: string;
  content: string;
  type: "terms" | "privacy" | "info";
}

interface CommonModalProps {
  visible: boolean;
  onClose: () => void;
  data: ModalData;
}

export default function CommonModal({
  visible,
  onClose,
  data,
}: CommonModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      Alert.alert("Accepted", `You accepted ${data.title}`);
    }, 500);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerIcon}>
                  <Text style={styles.headerIconText}>
                    {data.type === "terms"
                      ? "📜"
                      : data.type === "privacy"
                      ? "🔒"
                      : "ℹ️"}
                  </Text>
                </View>
                <Text style={styles.title}>{data.title}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Scrollable Content */}
              <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={true}
              >
                <Text style={styles.contentText}>{data.content}</Text>
                
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    📅 Last Updated: {new Date().toLocaleDateString()}
                  </Text>
                </View>
              </ScrollView>

              {/* Footer */}
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.declineButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.declineButtonText}>Decline</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={handleAccept}
                  disabled={isLoading}
                  activeOpacity={0.7}
                >
                  <Text style={styles.acceptButtonText}>
                    {isLoading ? "Processing..." : "Accept"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width - 32,
    maxHeight: height * 0.85,
    backgroundColor: colors.surface || "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border || "#E5E7EB",
    alignItems: "center",
    position: "relative",
    backgroundColor: colors.surface || "#FFFFFF",
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: (colors.primary || "#6366F1") + "15",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  headerIconText: {
    fontSize: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text || "#111827",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background || "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 18,
    color: colors.textLight || "#6B7280",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 24,
    paddingBottom: 20,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.textLight || "#4B5563",
    textAlign: "left",
  },
  infoBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: colors.background || "#F9FAFB",
    borderRadius: 8,
    alignItems: "center",
  },
  infoText: {
    fontSize: 12,
    color: colors.textLighter || "#9CA3AF",
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border || "#E5E7EB",
    backgroundColor: colors.surface || "#FFFFFF",
  },
  declineButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border || "#E5E7EB",
    alignItems: "center",
    backgroundColor: colors.surface || "#FFFFFF",
  },
  declineButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textLight || "#6B7280",
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.primary || "#6366F1",
    alignItems: "center",
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});