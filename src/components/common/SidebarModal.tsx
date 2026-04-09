// components/common/SidebarModal.tsx (Ultra Smooth)
import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import Sidebar from "./Sidebar";

interface SidebarModalProps {
  visible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.85;

export default function SidebarModal({ visible, onClose }: SidebarModalProps) {
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const contentOpacityAnim = useRef(new Animated.Value(0)).current;

  const openSidebar = () => {
    // Reset animations
    slideAnim.setValue(-SIDEBAR_WIDTH);
    overlayAnim.setValue(0);
    contentOpacityAnim.setValue(0);

    // Start animations in sequence
    Animated.parallel([
      // Slide animation with custom easing
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94), // Cubic bezier for smooth motion
      }),
      // Overlay fade in
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      // Content fade in (delayed for better effect)
      Animated.timing(contentOpacityAnim, {
        toValue: 1,
        duration: 400,
        delay: 50,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
    ]).start();
  };

  const closeSidebar = () => {
    Animated.parallel([
      // Slide out animation
      Animated.timing(slideAnim, {
        toValue: -SIDEBAR_WIDTH,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.55, 0.085, 0.68, 0.53),
      }),
      // Overlay fade out
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      // Content fade out
      Animated.timing(contentOpacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  useEffect(() => {
    if (visible) {
      openSidebar();
    } else {
      closeSidebar();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={closeSidebar}
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        {/* Overlay */}
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayAnim,
            },
          ]}
        >
          <TouchableWithoutFeedback onPress={closeSidebar}>
            <View style={styles.overlayTouchable} />
          </TouchableWithoutFeedback>
        </Animated.View>

        {/* Sidebar */}
        <Animated.View
          style={[
            styles.sidebarContainer,
            {
              transform: [{ translateX: slideAnim }],
              opacity: contentOpacityAnim,
            },
          ]}
        >
          <Sidebar onClose={closeSidebar} />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    height: height,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 15,
  },
});
