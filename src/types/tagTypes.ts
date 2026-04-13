// store/tagTypes.ts
export const TAG_TYPES = [
  // Auth & User
  "User",
  "Profile",
  "Auth",
  "Session",

  // Company
  "Company",

  // Location
  "Location",
  "Stop",

  // Business
  "Attendance",
  "Invoice",
  "Customer",
  "Vendor",
  "Task",
  "Notification",
  "Ticket",

  // Packages
  "Package",
  "Category",
] as const;

export type TagType = (typeof TAG_TYPES)[number];
