import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);

  useEffect(() => {
    // Animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to home after 2.5 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🚀</Text>
          <Text style={styles.appName}>MyApp</Text>
        </View>
        <Text style={styles.tagline}>Welcome to your journey</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6366f1",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 80,
    marginBottom: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#e0e7ff",
    marginTop: 20,
  },
});
