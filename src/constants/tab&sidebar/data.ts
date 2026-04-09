// constants/data.ts
export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  screen: string;
  userTypes?: string[];
  order: number;
}

export interface TabItem {
  id: string;
  title: string;
  icon: string;
  activeIcon?: string;
  screen: string;
  component: any; // Screen component
  userTypes?: string[];
  order: number;
  showInBottomTab: boolean;
}

// Dynamic Menu Items based on User Type
export const getMenuItems = (userType: string = "employee"): MenuItem[] => {
  const allMenus: MenuItem[] = [
    {
      id: "home",
      title: "Home",
      icon: "🏠",
      screen: "Home",
      userTypes: ["admin", "employee", "super-admin"],
      order: 1,
    },
    {
      id: "profile",
      title: "My Profile",
      icon: "👤",
      screen: "Profile",
      userTypes: ["admin", "employee", "super-admin"],
      order: 2,
    },
    {
      id: "companies",
      title: "Companies",
      icon: "🏢",
      screen: "Companies",
      userTypes: ["admin", "super-admin"],
      order: 3,
    },
    {
      id: "attendance",
      title: "Attendance",
      icon: "📅",
      screen: "Attendance",
      userTypes: ["admin", "employee", "super-admin"],
      order: 4,
    },
    {
      id: "leaves",
      title: "Leave Requests",
      icon: "📋",
      screen: "Leaves",
      userTypes: ["admin", "employee", "super-admin"],
      order: 5,
    },
    {
      id: "reports",
      title: "Reports",
      icon: "📊",
      screen: "Reports",
      userTypes: ["admin", "super-admin"],
      order: 6,
    },
    {
      id: "employees",
      title: "Employees",
      icon: "👥",
      screen: "Employees",
      userTypes: ["admin", "super-admin"],
      order: 7,
    },
    {
      id: "settings",
      title: "Settings",
      icon: "⚙️",
      screen: "Settings",
      userTypes: ["admin", "employee", "super-admin"],
      order: 8,
    },
  ];

  return allMenus
    .filter((menu) => menu.userTypes?.includes(userType))
    .sort((a, b) => a.order - b.order);
};

// Dynamic Bottom Tabs based on User Type
export const getBottomTabs = (userType: string = "employee"): TabItem[] => {
  const allTabs: TabItem[] = [
    {
      id: "home",
      title: "Home",
      icon: "🏠",
      activeIcon: "🏠",
      screen: "Home",
      component: null, // Will be assigned dynamically
      userTypes: ["admin", "employee", "super-admin"],
      order: 1,
      showInBottomTab: true,
    },
    {
      id: "about",
      title: "About",
      icon: "ℹ️",
      activeIcon: "ℹ️",
      screen: "About",
      component: null,
      userTypes: ["admin", "employee", "super-admin"],
      order: 2,
      showInBottomTab: true,
    },
    {
      id: "contact",
      title: "Contact",
      icon: "📞",
      activeIcon: "📞",
      screen: "Contact",
      component: null,
      userTypes: ["admin", "employee", "super-admin"],
      order: 3,
      showInBottomTab: true,
    },
    {
      id: "profile",
      title: "Profile",
      icon: "👤",
      activeIcon: "👤",
      screen: "Profile",
      component: null,
      userTypes: ["admin", "employee", "super-admin"],
      order: 4,
      showInBottomTab: true,
    },
  ];

  return allTabs
    .filter((tab) => tab.userTypes?.includes(userType) && tab.showInBottomTab)
    .sort((a, b) => a.order - b.order);
};

// API call simulation to get menus from backend
export const fetchMenusFromAPI = async (
  userType: string,
): Promise<MenuItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMenuItems(userType));
    }, 500);
  });
};

// API call simulation to get tabs from backend
export const fetchTabsFromAPI = async (
  userType: string,
): Promise<TabItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getBottomTabs(userType));
    }, 500);
  });
};
