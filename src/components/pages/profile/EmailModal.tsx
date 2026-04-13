// screens/profile/components/EmailModal.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setIsEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
  verifyOnly?: boolean;
}

// API integration point
const API = {
  sendEmailVerificationOtp: async (email: string) => {
    // Replace with your actual API call
    // const response = await api.post('/send-email-verification-otp', { email });
    // return response.data;
    console.log("Sending OTP to:", email);
    return { success: true };
  },
  verifyEmail: async (email: string, otp: string) => {
    // Replace with your actual API call
    // const response = await api.post('/verify-email', { email, otp });
    // return response.data;
    console.log("Verifying email:", email, otp);
    return { success: true };
  },
  sendOldEmailOtp: async (oldEmail: string) => {
    // Replace with your actual API call
    // const response = await api.post('/send-old-email-otp', { old_email: oldEmail });
    // return response.data;
    console.log("Sending OTP to old email:", oldEmail);
    return { success: true };
  },
  sendNewEmailOtp: async (newEmail: string) => {
    // Replace with your actual API call
    // const response = await api.post('/send-new-email-otp', { new_email: newEmail });
    // return response.data;
    console.log("Sending OTP to new email:", newEmail);
    return { success: true };
  },
  verifyEmailOtps: async (
    oldEmail: string,
    oldOtp: string,
    newEmail: string,
    newOtp: string,
  ) => {
    // Replace with your actual API call
    // const response = await api.post('/verify-email-otps', {
    //   old_email: oldEmail,
    //   old_otp: oldOtp,
    //   new_email: newEmail,
    //   new_otp: newOtp
    // });
    // return response.data;
    console.log("Verifying email OTPs");
    return { success: true };
  },
};

export default function EmailModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  setIsEmailVerified,
  verifyOnly = false,
}: EmailModalProps) {
  const [email, setEmail] = useState(formData.email);
  const [oldEmailOtp, setOldEmailOtp] = useState("");
  const [newEmailOtp, setNewEmailOtp] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oldOtpTimer, setOldOtpTimer] = useState(0);
  const [newOtpTimer, setNewOtpTimer] = useState(0);

  const startOtpTimer = (
    setter: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setter(30);
    const interval = setInterval(() => {
      setter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendVerificationOtp = async () => {
    if (!email || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await API.sendEmailVerificationOtp(email);
      Alert.alert("Success", "OTP sent to your email");
      setIsOtpSent(true);
      startOtpTimer(setOldOtpTimer);
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOldEmailOtp = async () => {
    setIsLoading(true);
    try {
      await API.sendOldEmailOtp(formData.email);
      Alert.alert("Success", "OTP sent to your email");
      startOtpTimer(setOldOtpTimer);
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendNewEmailOtp = async () => {
    if (!newEmail || !newEmail.includes("@")) {
      Alert.alert("Error", "Please enter a valid new email address");
      return;
    }
    if (newEmail === formData.email) {
      Alert.alert("Error", "New email must be different from current email");
      return;
    }

    setIsLoading(true);
    try {
      await API.sendNewEmailOtp(newEmail);
      Alert.alert("Success", "OTP sent to new email");
      startOtpTimer(setNewOtpTimer);
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!oldEmailOtp) {
      Alert.alert("Error", "Please enter OTP");
      return;
    }

    setIsLoading(true);
    try {
      await API.verifyEmail(email, oldEmailOtp);
      Alert.alert("Success", "Email verified successfully");
      setIsEmailVerified(true);
      setFormData((prev: any) => ({ ...prev, email }));
      onClose();
    } catch (error) {
      Alert.alert("Error", "Failed to verify email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!oldEmailOtp) {
      Alert.alert("Error", "Please enter current email OTP");
      return;
    }

    if (newEmail && newEmail !== formData.email && !newEmailOtp) {
      Alert.alert("Error", "Please enter new email OTP");
      return;
    }

    setIsLoading(true);
    try {
      await API.verifyEmailOtps(
        formData.email,
        oldEmailOtp,
        newEmail || formData.email,
        newEmailOtp || "",
      );
      Alert.alert("Success", "Email updated successfully");
      setIsEmailVerified(true);
      setFormData((prev: any) => ({
        ...prev,
        email: newEmail || formData.email,
      }));
      onClose();
    } catch (error) {
      Alert.alert("Error", "Failed to update email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {verifyOnly ? "Verify Email" : "Update Email"}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="times" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            {verifyOnly ? (
              <>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!isOtpSent}
                  />
                </View>

                {isOtpSent && (
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>OTP</Text>
                    <TextInput
                      style={styles.input}
                      value={oldEmailOtp}
                      onChangeText={setOldEmailOtp}
                      placeholder="Enter OTP"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="number-pad"
                    />
                  </View>
                )}

                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={onClose}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  {!isOtpSent ? (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.submitButton]}
                      onPress={handleSendVerificationOtp}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <Text style={styles.submitButtonText}>Send OTP</Text>
                      )}
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.submitButton]}
                      onPress={handleVerifyEmail}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <Text style={styles.submitButtonText}>Verify</Text>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </>
            ) : (
              <>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Current Email</Text>
                  <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={formData.email}
                    editable={false}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Current Email OTP</Text>
                  <View style={styles.otpContainer}>
                    <TouchableOpacity
                      style={styles.sendOtpButton}
                      onPress={handleSendOldEmailOtp}
                      disabled={isLoading || oldOtpTimer > 0}
                    >
                      <Text style={styles.sendOtpText}>
                        {oldOtpTimer > 0
                          ? `Resend (${oldOtpTimer}s)`
                          : "Send OTP"}
                      </Text>
                    </TouchableOpacity>
                    <TextInput
                      style={[styles.input, styles.otpInput]}
                      value={oldEmailOtp}
                      onChangeText={setOldEmailOtp}
                      placeholder="Enter OTP received on current email"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="number-pad"
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>New Email</Text>
                  <TextInput
                    style={styles.input}
                    value={newEmail}
                    onChangeText={setNewEmail}
                    placeholder="Enter new email address"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {newEmail && newEmail !== formData.email && (
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>New Email OTP</Text>
                    <View style={styles.otpContainer}>
                      <TouchableOpacity
                        style={styles.sendOtpButton}
                        onPress={handleSendNewEmailOtp}
                        disabled={isLoading || newOtpTimer > 0}
                      >
                        <Text style={styles.sendOtpText}>
                          {newOtpTimer > 0
                            ? `Resend (${newOtpTimer}s)`
                            : "Send OTP"}
                        </Text>
                      </TouchableOpacity>
                      <TextInput
                        style={[styles.input, styles.otpInput]}
                        value={newEmailOtp}
                        onChangeText={setNewEmailOtp}
                        placeholder="Enter OTP received on new email"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                )}

                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={onClose}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.submitButton]}
                    onPress={handleUpdateEmail}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <Text style={styles.submitButtonText}>
                        Verify & Update
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: "90%",
    maxHeight: "80%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1F2937",
    backgroundColor: "#F9FAFB",
  },
  disabledInput: {
    backgroundColor: "#F3F4F6",
    color: "#6B7280",
  },
  otpContainer: {
    gap: 8,
  },
  sendOtpButton: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  sendOtpText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3B82F6",
  },
  otpInput: {
    marginTop: 8,
  },
  formActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F3F4F6",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  submitButton: {
    backgroundColor: "#3B82F6",
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});
