// app/(app)/home/components/MetricsGrid.tsx
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Metric } from "../../../constants/Home/home.data";
import { colors } from "../../../constants/colors";


interface MetricsGridProps {
  metrics: Metric[];
}

const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  return (
    <View style={styles.container}>
      {metrics.map((metric, index) => (
        <View key={index} style={styles.metricCard}>
          <Text style={styles.icon}>{metric.icon}</Text>
          <Text style={styles.value}>{metric.value}</Text>
          <Text style={styles.label}>{metric.label}</Text>
          <View style={styles.changeContainer}>
            <Text
              style={[
                styles.change,
                metric.change > 0 ? styles.positive : styles.negative,
              ]}
            >
              {metric.change > 0 ? "+" : ""}
              {metric.change}%
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  metricCard: {
    width: "48%",
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  change: {
    fontSize: 12,
    fontWeight: "600",
  },
  positive: {
    color: colors.success,
  },
  negative: {
    color: colors.danger,
  },
});

export default MetricsGrid;
