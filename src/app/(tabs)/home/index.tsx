import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthHero } from "../../../components/pages/Home/AuthHero";
import { AuthSlider } from "../../../components/pages/Home/AuthSlider";
import { AuthFeatures } from "../../../components/pages/Home/AuthFeatures";
import { AuthCrmManagement } from "../../../components/pages/Home/AuthCrmManagement";
import { AuthSlaCompliant } from "../../../components/pages/Home/AuthSlaCompliant";
import { AuthWhyChoose } from "../../../components/pages/Home/AuthWhyChoose";
import { AuthPackages } from "../../../components/pages/Home/AuthPackages";
import { AuthFAQ } from "../../../components/pages/Home/AuthFAQ";

const Homepage = () => {
  useEffect(() => {
    const scrollToSection = async () => {
      const sectionId = await AsyncStorage.getItem("scrollToSection");
      if (sectionId) {
        // In React Native, we'll handle scroll programmatically via refs
        setTimeout(async () => {
          await AsyncStorage.removeItem("scrollToSection");
        }, 100);
      }
    };
    scrollToSection();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {/* hero section */}
        <AuthHero />

        {/* slider section */}
        <AuthSlider />

        {/* features section*/}
        <AuthFeatures />

        {/* management section*/}
        <AuthCrmManagement />

        {/* sla complaint section*/}
        <AuthSlaCompliant />

        {/* why choose us section*/}
        <AuthWhyChoose />

        {/* pricing section*/}
        <AuthPackages />

        {/* faq section*/}
        <AuthFAQ />
      </View>
    </ScrollView>
  );
};

export default Homepage;
