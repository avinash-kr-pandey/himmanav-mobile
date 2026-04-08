import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DynamicTabBar, { TabItem } from '../../components/common/DynamicTabBar';
import HomeScreen from './home';
import ExploreScreen from './explore';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

const tabConfig: TabItem[] = [
  { name: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { name: 'explore', label: 'Explore', icon: 'compass-outline', activeIcon: 'compass' },
  { name: 'profile', label: 'Profile', icon: 'person-outline', activeIcon: 'person' },
];

export default function TabLayout() {
  return (
    <Tab.Navigator
      tabBar={(props) => <DynamicTabBar {...props} tabConfig={tabConfig} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="explore" component={ExploreScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}