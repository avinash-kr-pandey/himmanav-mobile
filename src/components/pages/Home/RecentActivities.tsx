// app/(app)/home/components/RecentActivities.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Activity } from "../../../constants/Home/home.data";
import { colors } from "../../../constants/colors";


interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Activities</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>View All</Text>
        </TouchableOpacity>
      </View>
      {activities.map((activity) => (
        <View key={activity.id} style={styles.activityItem}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{activity.avatar}</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>
              <Text style={styles.userName}>{activity.user}</Text>{" "}
              {activity.action}
            </Text>
            <Text style={styles.time}>{activity.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight + "30",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  userName: {
    fontWeight: "bold",
  },
  time: {
    fontSize: 12,
    color: colors.textLight,
  },
});

export default RecentActivities;
