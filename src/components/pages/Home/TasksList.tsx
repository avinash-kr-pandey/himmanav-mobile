// app/(app)/home/components/TasksList.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Task } from "../../../constants/Home/home.data";
import { colors } from "../../../constants/colors";


interface TasksListProps {
  tasks: Task[];
}

const TasksList = ({ tasks }: TasksListProps) => {
  const [taskList, setTaskList] = useState(tasks);

  const toggleTask = (taskId: string) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return colors.danger;
      case "medium":
        return colors.warning;
      case "low":
        return colors.success;
      default:
        return colors.textLight;
    }
  };

  const pendingTasks = taskList.filter((task) => !task.completed);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks ({pendingTasks.length})</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>View All</Text>
        </TouchableOpacity>
      </View>
      {pendingTasks.slice(0, 4).map((task) => (
        <TouchableOpacity
          key={task.id}
          style={styles.taskCard}
          onPress={() => toggleTask(task.id)}
        >
          <View style={styles.checkbox}>
            {task.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <View style={styles.taskContent}>
            <Text
              style={[styles.taskTitle, task.completed && styles.completedText]}
            >
              {task.title}
            </Text>
            <Text style={styles.projectName}>{task.project}</Text>
          </View>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(task.priority) + "20" },
            ]}
          >
            <Text
              style={[
                styles.priorityText,
                { color: getPriorityColor(task.priority) },
              ]}
            >
              {task.priority}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
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
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: colors.textLight,
  },
  projectName: {
    fontSize: 12,
    color: colors.textLight,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});

export default TasksList;
