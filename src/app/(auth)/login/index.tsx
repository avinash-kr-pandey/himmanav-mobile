// screens/auth/LoginScreen.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../../contexts/AuthContext";
import { colors } from "../../../constants/colors";
import CommonModal from "../../../components/common/CommonModal";
import { privacyData, termsData } from "../../../constants/ModalData/modalData";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MainTabs: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const [number, setNumber] = useState(""); // ✅ Changed to match web
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ number?: string; password?: string }>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(termsData);

  const { login } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const passwordInputRef = useRef<TextInput>(null);

  // ✅ Validation matching web version
  const validateForm = (): boolean => {
    const newErrors: { number?: string; password?: string } = {};

    if (!number.trim()) {
      newErrors.number = "Mobile number is required";
    } else if (!/^\d{10}$/.test(number)) {
      newErrors.number = "Please enter a valid 10-digit mobile number";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // ✅ Send exactly like web version
      const response = await login({
        number: number,
        password: password,
      });

      if (response?.access_token) {
        navigation.reset({
          index: 0,
          routes: [{ name: "MainTabs" as never }],
        });
      } else {
        Alert.alert("Login Failed", response?.message || "Invalid credentials");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert(
        "Login Failed",
        error?.data?.error ||
          error?.message ||
          "Invalid mobile number or password. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openTermsModal = () => {
    setModalData(termsData);
    setModalVisible(true);
  };

  const openPrivacyModal = () => {
    setModalData(privacyData);
    setModalVisible(true);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background || "#F9FAFB"}
        />
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Logging in...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background || "#F9FAFB"}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.emoji}>👋🏻</Text>
                <Text style={styles.title}>Welcome back!</Text>
                <Text style={styles.subtitle}>
                  Please login to manage your dashboard.
                </Text>
              </View>

              <View style={styles.form}>
                {/* Mobile Number Input - Same as web */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Mobile Number</Text>
                  <TextInput
                    style={[styles.input, errors.number && styles.inputError]}
                    placeholder="0123456789"
                    placeholderTextColor={colors.textLighter}
                    value={number}
                    onChangeText={(text) => {
                      if (/^\d{0,10}$/.test(text)) {
                        setNumber(text);
                        if (errors.number) {
                          setErrors((prev) => ({ ...prev, number: undefined }));
                        }
                      }
                    }}
                    keyboardType="numeric"
                    maxLength={10}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    editable={!isLoading}
                  />
                  {errors.number && (
                    <Text style={styles.errorText}>{errors.number}</Text>
                  )}
                </View>

                {/* Password Input - Same as web */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      ref={passwordInputRef}
                      style={[
                        styles.input,
                        styles.passwordInput,
                        errors.password && styles.inputError,
                      ]}
                      placeholder="mySecurePass123"
                      placeholderTextColor={colors.textLighter}
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (errors.password) {
                          setErrors((prev) => ({
                            ...prev,
                            password: undefined,
                          }));
                        }
                      }}
                      secureTextEntry={!showPassword}
                      returnKeyType="done"
                      onSubmitEditing={handleLogin}
                      editable={!isLoading}
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.eyeText}>
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                {/* Forgot Password & Remember Me Row */}
                <View style={styles.optionsRow}>
                  <TouchableOpacity style={styles.rememberContainer}>
                    <View style={styles.checkbox}>
                      {/* Checkbox can be added later */}
                    </View>
                    <Text style={styles.rememberText}>Remember me</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    isLoading && styles.loginButtonDisabled,
                  ]}
                  onPress={handleLogin}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Text>
                </TouchableOpacity>

                {/* Register Link */}
                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>
                    don't have any account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.signupLink}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Footer - Same as web */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  By continuing, you agree to our
                </Text>
                <View style={styles.footerLinks}>
                  <TouchableOpacity onPress={openTermsModal}>
                    <Text style={styles.footerLink}>Terms of Service</Text>
                  </TouchableOpacity>
                  <Text style={styles.footerDot}>•</Text>
                  <TouchableOpacity onPress={openPrivacyModal}>
                    <Text style={styles.footerLink}>Privacy Policy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <CommonModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={modalData}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || "#F9FAFB",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background || "#F9FAFB",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textLight || "#6B7280",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text || "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight || "#6B7280",
    textAlign: "center",
  },
  form: {
    gap: 20,
  },
  inputWrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text || "#374151",
  },
  input: {
    backgroundColor: colors.surface || "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border || "#E5E7EB",
    color: colors.text || "#111827",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    top: 14,
  },
  eyeText: {
    fontSize: 20,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: colors.primary || "#6366F1",
    borderRadius: 4,
  },
  rememberText: {
    fontSize: 14,
    color: colors.textLight || "#6B7280",
  },
  forgotButton: {
    paddingVertical: 4,
  },
  forgotText: {
    fontSize: 14,
    color: colors.primary || "#6366F1",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: colors.primary || "#6366F1",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  signupText: {
    fontSize: 14,
    color: colors.textLight || "#6B7280",
  },
  signupLink: {
    fontSize: 14,
    color: colors.primary || "#6366F1",
    fontWeight: "600",
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: colors.textLighter || "#9CA3AF",
    marginBottom: 8,
  },
  footerLinks: {
    flexDirection: "row",
    gap: 8,
  },
  footerLink: {
    fontSize: 12,
    color: colors.primary || "#6366F1",
  },
  footerDot: {
    fontSize: 12,
    color: colors.textLighter || "#9CA3AF",
  },
});
