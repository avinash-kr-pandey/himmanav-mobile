import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DynamicTabBar, { TabItem } from './DynamicTabBar';
import HomeScreen from '../../app/(tabs)/home';
import ExploreScreen from '../../app/(tabs)/explore';
import ProfileScreen from '../../app/(tabs)/profile';


export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const tabConfig: TabItem[] = [
  { name: 'Home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { name: 'Explore', label: 'Explore', icon: 'compass-outline', activeIcon: 'compass' },
  { name: 'Profile', label: 'Profile', icon: 'person-outline', activeIcon: 'person' },
];

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <DynamicTabBar {...props} tabConfig={tabConfig} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}