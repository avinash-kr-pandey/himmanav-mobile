// app/(app)/home/home.data.ts

export interface Project {
  id: string;
  name: string;
  progress: number;
  deadline: string;
  status: "active" | "completed" | "on-hold";
  team: string[];
}

export interface Task {
  id: string;
  title: string;
  project: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  completed: boolean;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  time: string;
  avatar: string;
}

export interface Deal {
  id: string;
  customer: string;
  amount: number;
  stage: "lead" | "negotiation" | "won" | "lost";
  probability: number;
}

export interface Metric {
  label: string;
  value: string;
  change: number;
  icon: string;
}

export const dashboardMetrics: Metric[] = [
  { label: "Total Revenue", value: "$124,500", change: 12.5, icon: "💰" },
  { label: "Active Projects", value: "8", change: 2, icon: "📊" },
  { label: "Open Tasks", value: "24", change: -5, icon: "✅" },
  { label: "Happy Clients", value: "156", change: 18, icon: "😊" },
];

export const recentProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Website",
    progress: 75,
    deadline: "2024-03-15",
    status: "active",
    team: ["John", "Sarah", "Mike"],
  },
  {
    id: "2",
    name: "Mobile App Development",
    progress: 45,
    deadline: "2024-04-20",
    status: "active",
    team: ["Alex", "Emma"],
  },
  {
    id: "3",
    name: "CRM Integration",
    progress: 100,
    deadline: "2024-02-28",
    status: "completed",
    team: ["David", "Lisa"],
  },
  {
    id: "4",
    name: "Cloud Migration",
    progress: 30,
    deadline: "2024-05-10",
    status: "on-hold",
    team: ["Tom", "Jerry"],
  },
];

export const pendingTasks: Task[] = [
  {
    id: "1",
    title: "Design homepage UI",
    project: "E-commerce Website",
    priority: "high",
    dueDate: "2024-03-10",
    completed: false,
  },
  {
    id: "2",
    title: "Setup database schema",
    project: "Mobile App Development",
    priority: "high",
    dueDate: "2024-03-12",
    completed: false,
  },
  {
    id: "3",
    title: "API integration",
    project: "CRM Integration",
    priority: "medium",
    dueDate: "2024-03-08",
    completed: false,
  },
  {
    id: "4",
    title: "User testing session",
    project: "E-commerce Website",
    priority: "medium",
    dueDate: "2024-03-14",
    completed: false,
  },
  {
    id: "5",
    title: "Write documentation",
    project: "Cloud Migration",
    priority: "low",
    dueDate: "2024-03-20",
    completed: false,
  },
];

export const recentActivities: Activity[] = [
  {
    id: "1",
    user: "John Doe",
    action: 'completed task "Design homepage"',
    time: "2 hours ago",
    avatar: "JD",
  },
  {
    id: "2",
    user: "Sarah Smith",
    action: 'added new project "Mobile App"',
    time: "5 hours ago",
    avatar: "SS",
  },
  {
    id: "3",
    user: "Mike Johnson",
    action: 'commented on "API Integration"',
    time: "1 day ago",
    avatar: "MJ",
  },
  {
    id: "4",
    user: "Emma Wilson",
    action: "updated project status",
    time: "2 days ago",
    avatar: "EW",
  },
];

export const salesDeals: Deal[] = [
  {
    id: "1",
    customer: "Tech Corp",
    amount: 25000,
    stage: "negotiation",
    probability: 75,
  },
  {
    id: "2",
    customer: "Startup Inc",
    amount: 15000,
    stage: "lead",
    probability: 40,
  },
  {
    id: "3",
    customer: "Enterprise Ltd",
    amount: 50000,
    stage: "won",
    probability: 100,
  },
  {
    id: "4",
    customer: "Small Biz",
    amount: 8000,
    stage: "lost",
    probability: 0,
  },
];
