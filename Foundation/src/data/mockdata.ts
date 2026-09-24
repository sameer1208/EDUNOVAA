export type CustomerStatus = "Active" | "Inactive" | "Pending";

export type RequestStatus = "Completed" | "Pending" | "In Progress";

export type DashboardPeriod = "Today" | "This Week" | "This Month";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  service: string;
  joinedDate: string;
}

export interface ServiceRequest {
  id: number;
  customer: string;
  service: string;
  date: string;
  status: RequestStatus;
}

export interface DashboardStats {
  totalCustomers: number;
  activeServices: number;
  pendingRequests: number;
  revenue: number;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export interface ServicePoint {
  service: string;
  requests: number;
}

export interface RequestStatusPoint {
  id: number;
  value: number;
  label: RequestStatus;
}

export interface DashboardPeriodData {
  stats: DashboardStats;
  customers: Customer[];
  revenueData: RevenuePoint[];
  serviceData: ServicePoint[];
  requestStatusData: RequestStatusPoint[];
}

/* Base customer data */
export const customers: Customer[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "9876543210",
    status: "Active",
    service: "Website Development",
    joinedDate: "2026-08-12",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "9876543211",
    status: "Active",
    service: "Digital Marketing",
    joinedDate: "2026-08-15",
  },
  {
    id: 3,
    name: "Amit Verma",
    email: "amit@example.com",
    phone: "9876543212",
    status: "Inactive",
    service: "SEO Service",
    joinedDate: "2026-07-20",
  },
  {
    id: 4,
    name: "Neha Gupta",
    email: "neha@example.com",
    phone: "9876543213",
    status: "Active",
    service: "App Development",
    joinedDate: "2026-08-21",
  },
  {
    id: 5,
    name: "Rohit Kumar",
    email: "rohit@example.com",
    phone: "9876543214",
    status: "Pending",
    service: "Cloud Services",
    joinedDate: "2026-09-01",
  },
];

/* Base service-request data */
export const serviceRequests: ServiceRequest[] = [
  {
    id: 1,
    customer: "Rahul Sharma",
    service: "Website Development",
    date: "2026-09-18",
    status: "Completed",
  },
  {
    id: 2,
    customer: "Priya Singh",
    service: "Digital Marketing",
    date: "2026-09-19",
    status: "Pending",
  },
  {
    id: 3,
    customer: "Neha Gupta",
    service: "App Development",
    date: "2026-09-20",
    status: "In Progress",
  },
  {
    id: 4,
    customer: "Rohit Kumar",
    service: "Cloud Services",
    date: "2026-09-21",
    status: "Pending",
  },
];

/*
 * Dashboard mock data is now grouped by period.
 * Changing the Dashboard filter can use this single object to update
 * cards, charts, request distribution and recent-customer data together.
 */
export const dashboardDataByPeriod: Record<
  DashboardPeriod,
  DashboardPeriodData
> = {
  Today: {
    stats: {
      totalCustomers: 18,
      activeServices: 7,
      pendingRequests: 5,
      revenue: 12500,
    },
    customers: [
      {
        id: 101,
        name: "Arjun Mehta",
        email: "arjun@example.com",
        phone: "9876543221",
        status: "Active",
        service: "Website Development",
        joinedDate: "2026-09-24",
      },
      {
        id: 102,
        name: "Sneha Kapoor",
        email: "sneha@example.com",
        phone: "9876543222",
        status: "Pending",
        service: "Digital Marketing",
        joinedDate: "2026-09-24",
      },
      {
        id: 103,
        name: "Vikas Yadav",
        email: "vikas@example.com",
        phone: "9876543223",
        status: "Active",
        service: "App Development",
        joinedDate: "2026-09-24",
      },
      {
        id: 104,
        name: "Anjali Singh",
        email: "anjali@example.com",
        phone: "9876543224",
        status: "Inactive",
        service: "SEO Service",
        joinedDate: "2026-09-23",
      },
      {
        id: 105,
        name: "Karan Gupta",
        email: "karan@example.com",
        phone: "9876543225",
        status: "Pending",
        service: "Cloud Services",
        joinedDate: "2026-09-23",
      },
    ],
    revenueData: [
      { month: "06 AM", revenue: 1200 },
      { month: "09 AM", revenue: 2500 },
      { month: "12 PM", revenue: 4100 },
      { month: "03 PM", revenue: 6800 },
      { month: "06 PM", revenue: 9200 },
      { month: "Now", revenue: 12500 },
    ],
    serviceData: [
      { service: "Web Development", requests: 8 },
      { service: "Digital Marketing", requests: 6 },
      { service: "SEO", requests: 4 },
      { service: "App Development", requests: 7 },
      { service: "Cloud", requests: 3 },
    ],
    requestStatusData: [
      { id: 0, value: 40, label: "Completed" },
      { id: 1, value: 35, label: "Pending" },
      { id: 2, value: 25, label: "In Progress" },
    ],
  },

  "This Week": {
    stats: {
      totalCustomers: 74,
      activeServices: 24,
      pendingRequests: 12,
      revenue: 34200,
    },
    customers: [
      {
        id: 201,
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "9876543210",
        status: "Active",
        service: "Website Development",
        joinedDate: "2026-09-18",
      },
      {
        id: 202,
        name: "Priya Singh",
        email: "priya@example.com",
        phone: "9876543211",
        status: "Active",
        service: "Digital Marketing",
        joinedDate: "2026-09-19",
      },
      {
        id: 203,
        name: "Neha Gupta",
        email: "neha@example.com",
        phone: "9876543213",
        status: "Active",
        service: "App Development",
        joinedDate: "2026-09-20",
      },
      {
        id: 204,
        name: "Rohit Kumar",
        email: "rohit@example.com",
        phone: "9876543214",
        status: "Pending",
        service: "Cloud Services",
        joinedDate: "2026-09-21",
      },
      {
        id: 205,
        name: "Amit Verma",
        email: "amit@example.com",
        phone: "9876543212",
        status: "Inactive",
        service: "SEO Service",
        joinedDate: "2026-09-17",
      },
      {
        id: 206,
        name: "Pooja Mishra",
        email: "pooja@example.com",
        phone: "9876543226",
        status: "Active",
        service: "Website Development",
        joinedDate: "2026-09-16",
      },
      {
        id: 207,
        name: "Ravi Kumar",
        email: "ravi@example.com",
        phone: "9876543227",
        status: "Pending",
        service: "Cloud Services",
        joinedDate: "2026-09-15",
      },
    ],
    revenueData: [
      { month: "Mon", revenue: 4200 },
      { month: "Tue", revenue: 5100 },
      { month: "Wed", revenue: 4700 },
      { month: "Thu", revenue: 6200 },
      { month: "Fri", revenue: 6900 },
      { month: "Sat", revenue: 7100 },
      { month: "Sun", revenue: 34200 },
    ],
    serviceData: [
      { service: "Web Development", requests: 24 },
      { service: "Digital Marketing", requests: 18 },
      { service: "SEO", requests: 13 },
      { service: "App Development", requests: 16 },
      { service: "Cloud", requests: 11 },
    ],
    requestStatusData: [
      { id: 0, value: 48, label: "Completed" },
      { id: 1, value: 32, label: "Pending" },
      { id: 2, value: 20, label: "In Progress" },
    ],
  },

  "This Month": {
    stats: {
      totalCustomers: 1250,
      activeServices: 86,
      pendingRequests: 24,
      revenue: 78500,
    },
    customers: [
      ...customers,
      {
        id: 306,
        name: "Pooja Mishra",
        email: "pooja@example.com",
        phone: "9876543226",
        status: "Active",
        service: "Website Development",
        joinedDate: "2026-09-05",
      },
      {
        id: 307,
        name: "Ravi Kumar",
        email: "ravi@example.com",
        phone: "9876543227",
        status: "Pending",
        service: "Cloud Services",
        joinedDate: "2026-09-07",
      },
      {
        id: 308,
        name: "Kavita Joshi",
        email: "kavita@example.com",
        phone: "9876543228",
        status: "Active",
        service: "Digital Marketing",
        joinedDate: "2026-09-10",
      },
    ],
    revenueData: [
      { month: "Apr", revenue: 42000 },
      { month: "May", revenue: 51000 },
      { month: "Jun", revenue: 47000 },
      { month: "Jul", revenue: 62000 },
      { month: "Aug", revenue: 69000 },
      { month: "Sep", revenue: 78500 },
    ],
    serviceData: [
      { service: "Web Development", requests: 42 },
      { service: "Digital Marketing", requests: 31 },
      { service: "SEO", requests: 24 },
      { service: "App Development", requests: 18 },
      { service: "Cloud", requests: 12 },
    ],
    requestStatusData: [
      { id: 0, value: 45, label: "Completed" },
      { id: 1, value: 30, label: "Pending" },
      { id: 2, value: 25, label: "In Progress" },
    ],
  },
};

/* Backward-compatible exports for other dashboard consumers */
export const dashboardStatsByPeriod: Record<DashboardPeriod, DashboardStats> = {
  Today: dashboardDataByPeriod.Today.stats,
  "This Week": dashboardDataByPeriod["This Week"].stats,
  "This Month": dashboardDataByPeriod["This Month"].stats,
};

export const dashboardStats: DashboardStats =
  dashboardDataByPeriod["This Month"].stats;

export const revenueData = dashboardDataByPeriod["This Month"].revenueData;

export const serviceData = dashboardDataByPeriod["This Month"].serviceData;

export const requestStatusData =
  dashboardDataByPeriod["This Month"].requestStatusData;
