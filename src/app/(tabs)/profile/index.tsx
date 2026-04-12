import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/AuthContext";
import { colors } from "../../../constants/colors";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0, width: 0 });
  const buttonRef = useRef<View>(null);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => {
            logout();
          }
        },
      ]
    );
    setIsDropdownOpen(false);
  };

  const measureButtonPosition = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setButtonPosition({ x: pageX, y: pageY + height, width });
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Dropdown */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            ref={buttonRef}
            style={styles.profileButton}
            onPress={() => {
              measureButtonPosition();
              setIsDropdownOpen(!isDropdownOpen);
            }}
            activeOpacity={0.7}
          >
            <View style={styles.avatarSmall}>
              {user?.profile_image ? (
                <Image
                  source={{ uri: user.profile_image }}
                  style={styles.avatarImage}
                />
              ) : (
                <Text style={styles.avatarTextSmall}>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </Text>
              )}
            </View>
            <Icon 
              name="chevron-down" 
              size={16} 
              color="#FFFFFF" 
              solid 
              style={[styles.dropdownIcon, isDropdownOpen && styles.dropdownIconOpen]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Modal */}
      <Modal
        visible={isDropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsDropdownOpen(false)}>
          <View style={styles.modalOverlay}>
            <View 
              style={[
                styles.dropdownMenu,
                {
                  top: buttonPosition.y,
                  right: width - (buttonPosition.x + buttonPosition.width - 10),
                },
              ]}
            >
              {/* User Info Header */}
              <TouchableOpacity 
                style={styles.menuHeader}
                onPress={() => {
                  setIsDropdownOpen(false);
                  // Navigate to profile if needed
                }}
              >
                <View style={styles.avatarMenu}>
                  {user?.profile_image ? (
                    <Image
                      source={{ uri: user.profile_image }}
                      style={styles.avatarMenuImage}
                    />
                  ) : (
                    <Text style={styles.avatarMenuText}>
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </Text>
                  )}
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user?.name || "User"}</Text>
                  <Text style={styles.userEmail}>{user?.email || ""}</Text>
                </View>
              </TouchableOpacity>

              {/* Menu Items */}
              <View style={styles.menuItems}>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    setIsDropdownOpen(false);
                    // Navigate to add company
                  }}
                >
                  <View style={styles.menuIcon}>
                    <Icon name="building" size={16} color="#4361ee" solid />
                  </View>
                  <Text style={styles.menuText}>Add Company</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    setIsDropdownOpen(false);
                    // Navigate to my tickets
                  }}
                >
                  <View style={styles.menuIcon}>
                    <Icon name="ticket-alt" size={16} color="#4361ee" solid />
                  </View>
                  <Text style={styles.menuText}>My Tickets</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity 
                  style={[styles.menuItem, styles.logoutItem]}
                  onPress={handleLogout}
                >
                  <View style={styles.menuIcon}>
                    <Icon name="sign-out-alt" size={16} color="#EF4444" solid />
                  </View>
                  <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Profile Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            {user?.profile_image ? (
              <Image
                source={{ uri: user.profile_image }}
                style={styles.avatarLargeImage}
              />
            ) : (
              <Text style={styles.avatarLargeText}>
                {user?.name?.[0]?.toUpperCase() || "U"}
              </Text>
            )}
          </View>
          <Text style={styles.userNameLarge}>{user?.name || "User"}</Text>
          <View style={styles.userTypeBadge}>
            <Text style={styles.userTypeText}>{user?.user_type || "User"}</Text>
          </View>
        </View>

        {/* Account Information */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="account-circle" size={22} color="#4361ee" />
            <Text style={styles.sectionTitle}>Account Information</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Icon name="id-card" size={14} color="#6B7280" solid />
                <Text style={styles.infoLabel}>User ID</Text>
              </View>
              <Text style={styles.infoValue}>{user?.id || "N/A"}</Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Icon name="envelope" size={14} color="#6B7280" solid />
                <Text style={styles.infoLabel}>Email</Text>
              </View>
              <Text style={styles.infoValue}>{user?.email || "Not provided"}</Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Icon name="user-tag" size={14} color="#6B7280" solid />
                <Text style={styles.infoLabel}>User Type</Text>
              </View>
              <View style={styles.userTypeContainer}>
                <Text style={styles.infoValue}>{user?.user_type || "User"}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <Icon name="calendar-alt" size={14} color="#6B7280" solid />
                <Text style={styles.infoLabel}>Member Since</Text>
              </View>
              <Text style={styles.infoValue}>
                {user?.created_at ? new Date(user.created_at).getFullYear() : "2024"}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="flash-on" size={22} color="#4361ee" />
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>

          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Icon name="building" size={20} color="#4361ee" solid />
              </View>
              <Text style={styles.actionText}>Add Company</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Icon name="ticket-alt" size={20} color="#4361ee" solid />
              </View>
              <Text style={styles.actionText}>My Tickets</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Icon name="shield-alt" size={20} color="#4361ee" solid />
              </View>
              <Text style={styles.actionText}>Security</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Icon name="headset" size={20} color="#4361ee" solid />
              </View>
              <Text style={styles.actionText}>Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#4361ee",
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
    gap: 8,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatarTextSmall: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4361ee",
  },
  dropdownIcon: {
    transition: "transform 0.3s",
  },
  dropdownIconOpen: {
    transform: [{ rotate: "180deg" }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdownMenu: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    width: 280,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: 12,
  },
  avatarMenu: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0F4FF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarMenuImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarMenuText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4361ee",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  userEmail: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  menuItems: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 8,
  },
  logoutItem: {
    marginTop: 4,
  },
  logoutText: {
    color: "#EF4444",
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F0F4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#4361ee",
  },
  avatarLargeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarLargeText: {
    fontSize: 40,
    fontWeight: "600",
    color: "#4361ee",
  },
  userNameLarge: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  userTypeBadge: {
    backgroundColor: "#F0F4FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  userTypeText: {
    fontSize: 12,
    color: "#4361ee",
    fontWeight: "500",
  },
  infoSection: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  infoCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  infoLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  infoValue: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  userTypeContainer: {
    backgroundColor: "#F0F4FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  actionsSection: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    width: (width - 52) / 2,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  actionText: {
    fontSize: 13,
    color: "#1F2937",
    fontWeight: "500",
  },
});