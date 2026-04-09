// app/(app)/home/index.tsx
import React from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { colors } from "../../../constants/colors";
import Header from "../../../components/pages/Home/Header";
import MetricsGrid from "../../../components/pages/Home/MetricsGrid";
import TasksList from "../../../components/pages/Home/TasksList";
import RecentActivities from "../../../components/pages/Home/RecentActivities";
import { dashboardMetrics, pendingTasks, recentActivities } from "../../../constants/Home/home.data";
import StatsCard from "../../../components/pages/Home/StatsCard";



export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Header  />
      <MetricsGrid metrics={dashboardMetrics} />
      <StatsCard number={128} label="Total Projects" />
      <TasksList tasks={pendingTasks} />
      <RecentActivities activities={recentActivities} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
