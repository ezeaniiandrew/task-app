export const STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

export type typeOfStatus = (typeof STATUS)[keyof typeof STATUS];

export type Task = {
  id: string;
  title: string;
  status: (typeof STATUS)[keyof typeof STATUS];
};

export const TABS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

export type ActiveTab = (typeof TABS)[keyof typeof TABS];
