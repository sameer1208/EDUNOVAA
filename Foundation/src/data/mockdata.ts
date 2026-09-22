export type CustomerStatus = "Active" | "Inactive" | "Pending";

export type RequestStatus = "Completed" | "Pending" | "In Progress";

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

export const dashboardStats: DashboardStats = {
  totalCustomers: 1250,
  activeServices: 86,
  pendingRequests: 24,
  revenue: 78500,
};

/* Revenue chart */

export const revenueData = [
  { month: "Apr", revenue: 42000 },
  { month: "May", revenue: 51000 },
  { month: "Jun", revenue: 47000 },
  { month: "Jul", revenue: 62000 },
  { month: "Aug", revenue: 69000 },
  { month: "Sep", revenue: 78500 },
];

/* Services chart */

export const serviceData = [
  {
    service: "Web Development",
    requests: 42,
  },
  {
    service: "Digital Marketing",
    requests: 31,
  },
  {
    service: "SEO",
    requests: 24,
  },
  {
    service: "App Development",
    requests: 18,
  },
  {
    service: "Cloud",
    requests: 12,
  },
];

/* Request status */

export const requestStatusData = [
  {
    id: 0,
    value: 45,
    label: "Completed",
  },
  {
    id: 1,
    value: 30,
    label: "Pending",
  },
  {
    id: 2,
    value: 25,
    label: "In Progress",
  },
];
