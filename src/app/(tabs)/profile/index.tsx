// screens/ProfileScreen.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
  Alert,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SessionsList from "../../../components/pages/profile/SessionsList";
import EditUserModal from "../../../components/pages/profile/EditUserModal";
import ChangePasswordModal from "../../../components/pages/profile/ChangePasswordModal";
import { ButtonPosition } from "../../../types/profile";

import {
  useChangePasswordMutation,
  useLogoutMutation,
} from "../../../../store/authApi";
import { setTheme } from "../../../../store/slices/theme/themeSlice";
import {
  useGetLoginSessionsQuery,
  useGetProfileQuery,
} from "../../../../store/profileApi";

const { width, height } = Dimensions.get("window");

// Helper function to clear storage
const clearStorage = async () => {
  try {
    await AsyncStorage.removeItem("auth_token");
    await AsyncStorage.removeItem("user_data");
    await AsyncStorage.removeItem("NAVIGATION_STATE");
    await AsyncStorage.removeItem("NAVIGATION_STATE_KEY");
    console.log("Storage cleared successfully");
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user: authUser, setUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>({
    x: 0,
    y: 0,
    width: 0,
  });
  const buttonRef = useRef<any>(null);
  const navigation = useNavigation();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [refreshing, setRefreshing] = useState(false);

  // Modal states
  const [editUserModal, setEditUserModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  // Profile covers array for auto-slide
  const profileCovers = [
    { uri: "https://picsum.photos/800/300?random=1" },
    { uri: "https://picsum.photos/800/300?random=2" },
    { uri: "https://picsum.photos/800/300?random=3" },
  ];
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);

  // Auto slide cover every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCoverIndex((prev) => (prev + 1) % profileCovers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // API calls
  const {
    data: profileData,
    isLoading: isProfileLoading,
    refetch: refetchProfile,
  } = useGetProfileQuery();

  const {
    data: sessionsData,
    isLoading: isSessionsLoading,
    refetch: refetchSessions,
  } = useGetLoginSessionsQuery();

  const [changePassword] = useChangePasswordMutation();

  // Use real API data first, fallback to auth user
  const user = profileData || authUser;
  const sessions = sessionsData?.sessions || [];
  const totalLogins = sessionsData?.total_logins || 0;

  // Get user stats from API or default
  const userStats = {
    companies:
      (user as any)?.stats?.companies || (user as any)?.companies_count || 0,
    projects:
      (user as any)?.stats?.projects || (user as any)?.projects_count || 0,
    tickets: (user as any)?.stats?.tickets || (user as any)?.tickets_count || 0,
  };

  const measureButtonPosition = () => {
    if (buttonRef.current) {
      buttonRef.current.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          setButtonPosition({ x: pageX, y: pageY + height, width });
        },
      );
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            setIsDropdownOpen(false);

            const response = await logout().unwrap();

            if (response?.message) {
              await clearStorage();
              setUser(null);
              dispatch(setTheme("light"));

              navigation.reset({
                index: 0,
                routes: [{ name: "Login" as never }],
              });
            }
          } catch (error: any) {
            Alert.alert("Error", error?.data?.message || "Failed to logout");
          }
        },
      },
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchProfile(), refetchSessions()]);
    setRefreshing(false);
  };

  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  if (isProfileLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      {/* Header - Attractive Design */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: "#EFF6FF",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, color: "#3B82F6" }}>👤</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>Profile</Text>
              <Text style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>
                Manage your account
              </Text>
            </View>
          </View>

          <TouchableOpacity
            ref={buttonRef}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F3F4F6",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 25,
              gap: 8,
            }}
            onPress={() => {
              measureButtonPosition();
              setIsDropdownOpen(!isDropdownOpen);
            }}
            activeOpacity={0.7}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#EFF6FF",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {user?.profile_image ? (
                <Image
                  source={{ uri: user.profile_image }}
                  style={{ width: 32, height: 32, borderRadius: 16 }}
                />
              ) : (
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#3B82F6" }}
                >
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </Text>
              )}
            </View>
            <Text style={{ fontSize: 13, fontWeight: "500", color: "#374151" }}>
              {user?.name?.split(" ")[0] || "Account"}
            </Text>
            <Icon
              name="chevron-down"
              size={12}
              color="#6B7280"
              style={{ marginLeft: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Menu Modal */}
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
              <TouchableOpacity
                style={styles.menuHeader}
                onPress={() => setIsDropdownOpen(false)}
                activeOpacity={0.7}
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

              <View style={styles.menuItems}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setIsDropdownOpen(false);
                    setEditUserModal(true);
                  }}
                  activeOpacity={0.7}
                >
                  <Icon name="user-edit" size={16} color="#3B82F6" />
                  <Text style={styles.menuText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setIsDropdownOpen(false);
                    setChangePasswordModal(true);
                  }}
                  activeOpacity={0.7}
                >
                  <Icon name="lock" size={16} color="#10B981" />
                  <Text style={styles.menuText}>Change Password</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={handleLogout}
                  activeOpacity={0.7}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <ActivityIndicator size="small" color="#EF4444" />
                  ) : (
                    <>
                      <Icon name="sign-out-alt" size={16} color="#EF4444" />
                      <Text style={[styles.menuText, styles.logoutText]}>
                        Logout
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Main Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
        overScrollMode="always"
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3B82F6"]}
          />
        }
      >
        {/* Profile Cover with Auto-slide */}
        <View style={styles.coverContainer}>
          <Image
            source={profileCovers[currentCoverIndex]}
            style={styles.coverImage}
          />
          <View style={styles.coverIndicators}>
            {profileCovers.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  index === currentCoverIndex && styles.indicatorActive,
                ]}
                onPress={() => setCurrentCoverIndex(index)}
              />
            ))}
          </View>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity
            style={styles.avatarLarge}
            onPress={() => user?.profile_image && setIsImagePreviewOpen(true)}
            activeOpacity={0.8}
          >
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
            <View style={styles.editIconOverlay}>
              <MaterialIcons name="camera-alt" size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <Text style={styles.userNameLarge}>{user?.name || "User"}</Text>

          <View style={styles.userTypeContainer}>
            <MaterialIcons name="verified" size={14} color="#3B82F6" />
            <Text style={styles.userTypeText}>
              {user?.user_type || "Business Owner"}
            </Text>
          </View>

          {/* Stats - Real data from API */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.companies}</Text>
              <Text style={styles.statLabel}>Companies</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalLogins}</Text>
              <Text style={styles.statLabel}>Total Logins</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.projects}</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
          </View>
        </View>

        {/* Information Section - Real data from API */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="mail-outline" size={18} color="#6B7280" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <View style={styles.infoValueRow}>
                  <Text style={styles.infoValue}>
                    {user?.email || "Not provided"}
                  </Text>
                  {user?.email_verified_at && (
                    <MaterialIcons name="verified" size={14} color="#22C55E" />
                  )}
                </View>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="call-outline" size={18} color="#6B7280" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>
                  {user?.number || user?.phone || "Not provided"}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="id-card-outline" size={18} color="#6B7280" />
              </View>
              <View>
                <Text style={styles.infoLabel}>User ID</Text>
                <Text style={styles.infoValue}>
                  {user?.uid || user?.id || "N/A"}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="calendar-outline" size={18} color="#6B7280" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Member Since</Text>
                <Text style={styles.infoValue}>
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "2024"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sessions Section */}
        <SessionsList
          sessions={sessions}
          totalLogins={totalLogins}
          isLoading={isSessionsLoading}
          formatDate={formatDate}
        />

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => setEditUserModal(true)}
            activeOpacity={0.8}
          >
            <Icon name="user-edit" size={16} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.passwordButton]}
            onPress={() => setChangePasswordModal(true)}
            activeOpacity={0.8}
          >
            <Icon name="lock" size={16} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Image Preview Modal */}
      <Modal
        visible={isImagePreviewOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsImagePreviewOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsImagePreviewOpen(false)}>
          <View style={styles.imagePreviewOverlay}>
            <View style={styles.imagePreviewContainer}>
              {user?.profile_image ? (
                <Image
                  source={{ uri: user.profile_image }}
                  style={styles.imagePreview}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.imagePreviewPlaceholder}>
                  <Text style={styles.imagePreviewText}>
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.closePreviewButton}
                onPress={() => setIsImagePreviewOpen(false)}
              >
                <Icon name="times" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Edit User Modal */}
      <EditUserModal
        userId={user?.id ?? 0}
        userData={user}
        isOpen={editUserModal}
        onClose={() => {
          setEditUserModal(false);
          refetchProfile();
          refetchSessions();
        }}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={changePasswordModal}
        onClose={() => setChangePasswordModal(false)}
        onChangePassword={changePassword}
      />
    </SafeAreaView>
  );
}

// Styles remain the same as before...
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "ios" ? 12 : 12,
    paddingBottom: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
 
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
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
    color: "#3B82F6",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  dropdownMenu: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    width: 220,
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
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: 10,
  },
  avatarMenu: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarMenuImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarMenuText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
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
    paddingVertical: 6,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 12,
  },
  menuText: {
    fontSize: 14,
    color: "#1F2937",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 6,
  },
  logoutText: {
    color: "#EF4444",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.OS === "ios" ? 20 : 24,
  },
  coverContainer: {
    height: 150,
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  coverIndicators: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  indicatorActive: {
    backgroundColor: "#FFFFFF",
    width: 20,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    marginTop: -40,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  avatarLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -60,
    marginBottom: 12,
    overflow: "hidden",
    position: "relative",
  },
  avatarLargeImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarLargeText: {
    fontSize: 36,
    fontWeight: "600",
    color: "#3B82F6",
  },
  editIconOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#3B82F6",
    borderRadius: 20,
    padding: 6,
  },
  userNameLarge: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  userTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  userTypeText: {
    fontSize: 12,
    color: "#3B82F6",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    width: "100%",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#F3F4F6",
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  infoGrid: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 2,
  },
  infoValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoValue: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  actionButtons: {
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  editButton: {
    backgroundColor: "#3B82F6",
  },
  passwordButton: {
    backgroundColor: "#10B981",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  imagePreviewOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreviewContainer: {
    width: width - 40,
    height: height - 100,
    position: "relative",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  imagePreviewPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreviewText: {
    fontSize: 80,
    fontWeight: "600",
    color: "#3B82F6",
  },
  closePreviewButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
});
