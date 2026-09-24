import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import {
  FiUsers,
  FiActivity,
  FiClock,
  FiDollarSign,
  FiArrowUpRight,
  FiSearch,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";

import { LineChart, BarChart, PieChart } from "@mui/x-charts";
import { useMemo, useState } from "react";

import { dashboardDataByPeriod } from "../data/mockdata";
import { useNavigate } from "react-router-dom";
import { StatCard } from "../components/statCard/StatCard";

const Dashboard = () => {
  type DashboardPeriod = "Today" | "This Week" | "This Month";

  const [selectedPeriod, setSelectedPeriod] =
    useState<DashboardPeriod>("This Month");

  const [requestSearch, setRequestSearch] = useState("");
  const [requestStatusFilter, setRequestStatusFilter] = useState<
    "All" | "Active" | "Inactive" | "Pending"
  >("All");
  const [requestSort, setRequestSort] = useState<
    "name" | "service" | "joinedDate"
  >("joinedDate");
  const [requestSortDirection, setRequestSortDirection] = useState<
    "asc" | "desc"
  >("desc");

  const navigate = useNavigate();

  const selectedDashboardData = dashboardDataByPeriod[selectedPeriod];
  const selectedStats = selectedDashboardData.stats;
  const periodCustomers = selectedDashboardData.customers;
  const revenueData = selectedDashboardData.revenueData;
  const serviceData = selectedDashboardData.serviceData;
  const requestStatusData = selectedDashboardData.requestStatusData;

  const filteredCustomers = useMemo(() => {
    const search = requestSearch.trim().toLowerCase();

    const result = periodCustomers.filter((customer) => {
      const matchesSearch =
        !search ||
        customer.name.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search) ||
        customer.phone.toLowerCase().includes(search) ||
        customer.service.toLowerCase().includes(search);

      const matchesStatus =
        requestStatusFilter === "All" ||
        customer.status === requestStatusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      const comparison = String(a[requestSort]).localeCompare(
        String(b[requestSort]),
        undefined,
        { numeric: true, sensitivity: "base" },
      );
      return requestSortDirection === "asc" ? comparison : -comparison;
    });
  }, [
    periodCustomers,
    requestSearch,
    requestStatusFilter,
    requestSort,
    requestSortDirection,
  ]);

  const handleRequestSort = (field: "name" | "service" | "joinedDate") => {
    if (requestSort === field) {
      setRequestSortDirection((current) =>
        current === "asc" ? "desc" : "asc",
      );
      return;
    }

    setRequestSort(field);
    setRequestSortDirection(field === "joinedDate" ? "desc" : "asc");
  };

  const sortIcon = (field: "name" | "service" | "joinedDate") => {
    if (requestSort !== field) return null;
    return requestSortDirection === "asc" ? (
      <FiChevronUp size={13} />
    ) : (
      <FiChevronDown size={13} />
    );
  };

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
        background: "#f8fafc",
        minHeight: "calc(100vh - 90px)",
      }}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Dashboard Overview
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 0.5,
            }}
          >
            Monitor your business performance and service activity.
          </Typography>
        </Box>

        <Chip
          label="September 22, 2026"
          variant="outlined"
          sx={{
            background: "#fff",
          }}
        />
      </Stack>

      {/* =====================================================
          DATE / PERIOD FILTER
      ====================================================== */}

      <Card
        sx={{
          borderRadius: 3,
          mb: 2.5,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
                Dashboard Filter
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Select a date range to update the summary cards
              </Typography>
            </Box>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel id="dashboard-period-filter-label">
                Date Range
              </InputLabel>
              <Select
                labelId="dashboard-period-filter-label"
                value={selectedPeriod}
                label="Date Range"
                onChange={(event) =>
                  setSelectedPeriod(event.target.value as DashboardPeriod)
                }
              >
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="This Week">This Week</MenuItem>
                <MenuItem value="This Month">This Month</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      {/* =====================================================
          STATS
      ====================================================== */}

      <Grid
        container
        spacing={2.5}
        sx={{
          mb: 3,
        }}
      >
        {/* Total Customers */}
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <StatCard
            title="Total Customers"
            value={selectedStats.totalCustomers.toLocaleString()}
            subtitle={`for ${selectedPeriod.toLowerCase()}`}
            trend={
              selectedPeriod === "Today"
                ? "+6%"
                : selectedPeriod === "This Week"
                  ? "+10%"
                  : "+12%"
            }
            icon={<FiUsers />}
            iconBackground="#eef2ff"
          />
        </Grid>

        {/* Active Services */}
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <StatCard
            title="Active Services"
            value={selectedStats.activeServices.toString()}
            subtitle={`for ${selectedPeriod.toLowerCase()}`}
            trend={
              selectedPeriod === "Today"
                ? "+4%"
                : selectedPeriod === "This Week"
                  ? "+7%"
                  : "+8%"
            }
            icon={<FiActivity />}
            iconBackground="#ecfeff"
          />
        </Grid>

        {/* Pending Requests */}
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <StatCard
            title="Pending Requests"
            value={selectedStats.pendingRequests.toString()}
            subtitle={`for ${selectedPeriod.toLowerCase()}`}
            trend={
              selectedPeriod === "Today"
                ? "+2"
                : selectedPeriod === "This Week"
                  ? "+4"
                  : "+5"
            }
            icon={<FiClock />}
            iconBackground="#fffbeb"
          />
        </Grid>

        {/* Revenue */}
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <StatCard
            title="Revenue"
            value={`$${selectedStats.revenue.toLocaleString()}`}
            subtitle={`for ${selectedPeriod.toLowerCase()}`}
            trend={
              selectedPeriod === "Today"
                ? "+6%"
                : selectedPeriod === "This Week"
                  ? "+10%"
                  : "+15%"
            }
            icon={<FiDollarSign />}
            iconBackground="#ecfdf5"
          />
        </Grid>
      </Grid>

      {/* =====================================================
          CHARTS
      ====================================================== */}

      <Grid
        container
        spacing={2.5}
        sx={{
          mb: 3,
        }}
      >
        {/* =================================================
            REVENUE CHART
        ================================================== */}

        <Grid
          size={{
            xs: 12,
            lg: 8,
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    Revenue Overview
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    {selectedPeriod} revenue performance
                  </Typography>
                </Box>

                <Chip
                  label={
                    selectedPeriod === "Today"
                      ? "+6%"
                      : selectedPeriod === "This Week"
                        ? "+10%"
                        : "+15%"
                  }
                  size="small"
                  sx={{
                    background: "#ecfdf3",
                    color: "#15803d",
                    fontWeight: 600,
                  }}
                />
              </Stack>

              <Box
                sx={{
                  width: "100%",
                  height: {
                    xs: 280,
                    sm: 320,
                  },
                  overflow: "hidden",
                }}
              >
                <LineChart
                  xAxis={[
                    {
                      scaleType: "point",
                      data: revenueData.map((item) => item.month),
                    },
                  ]}
                  series={[
                    {
                      data: revenueData.map((item) => item.revenue),
                      label: "Revenue",
                      area: true,
                      color: "#4f46e5",
                    },
                  ]}
                  height={300}
                  margin={{
                    left: 60,
                    right: 20,
                    top: 20,
                    bottom: 30,
                  }}
                  grid={{
                    horizontal: true,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* =================================================
            REQUEST STATUS
        ================================================== */}

        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                Request Status
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                }}
              >
                {selectedPeriod} request distribution
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <PieChart
                  series={[
                    {
                      data: requestStatusData,
                      innerRadius: 65,
                      outerRadius: 105,
                      paddingAngle: 3,
                      cornerRadius: 4,
                    },
                  ]}
                  width={280}
                  height={250}
                  hideLegend
                />
              </Box>

              {/* Request Status Legend */}
              <Stack spacing={1.2}>
                {requestStatusData.map((item, index) => (
                  <Stack
                    key={item.id}
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          background: ["#4f46e5", "#f59e0b", "#06b6d4"][index],
                        }}
                      />

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Stack>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                      }}
                    >
                      {item.value}%
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card
        sx={{
          borderRadius: 3,
          mb: 3,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            Service Performance
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
            }}
          >
            {selectedPeriod} requests by service
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: {
                xs: 280,
                sm: 320,
              },
              mt: 1,
              overflow: "hidden",
            }}
          >
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: serviceData.map((item) => item.service),
                },
              ]}
              series={[
                {
                  data: serviceData.map((item) => item.requests),
                  label: "Requests",
                  color: "#4f46e5",
                },
              ]}
              height={300}
              borderRadius={6}
              margin={{
                left: 50,
                right: 20,
                top: 20,
                bottom: 70,
              }}
              grid={{
                horizontal: true,
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: { xs: "stretch", md: "center" },
              p: 2.5,
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                Recent Service Requests
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Showing {filteredCustomers.length} of {periodCustomers.length}{" "}
                customers
              </Typography>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{ width: { xs: "100%", md: "auto" } }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.25,
                  height: 38,
                  minWidth: { xs: "100%", sm: 210 },
                  border: "1px solid #e2e8f0",
                  borderRadius: 2,
                  background: "#fff",
                  "&:focus-within": {
                    borderColor: "#a5b4fc",
                    boxShadow: "0 0 0 3px rgba(79,70,229,0.08)",
                  },
                }}
              >
                <FiSearch size={16} color="#94a3b8" />
                <Box
                  component="input"
                  value={requestSearch}
                  onChange={(event) => setRequestSearch(event.target.value)}
                  placeholder="Search customers..."
                  sx={{
                    width: "100%",
                    border: 0,
                    outline: 0,
                    background: "transparent",
                    fontSize: 12,
                    color: "#334155",
                  }}
                />
              </Box>

              <FormControl
                size="small"
                sx={{ minWidth: { xs: "100%", sm: 135 } }}
              >
                <Select
                  value={requestStatusFilter}
                  onChange={(event) =>
                    setRequestStatusFilter(
                      event.target.value as
                        | "All"
                        | "Active"
                        | "Inactive"
                        | "Pending",
                    )
                  }
                  displayEmpty
                  sx={{
                    height: 38,
                    fontSize: 12,
                    background: "#fff",
                    borderRadius: 2,
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4f46e5",
                    },
                  }}
                >
                  <MenuItem value="All">All Status</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          <Divider />

          <Box sx={{ overflowX: "auto" }}>
            <Box
              component="table"
              sx={{
                width: "100%",
                minWidth: 650,
                borderCollapse: "collapse",
                "& th": {
                  textAlign: "left",
                  fontSize: 11,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  p: 2,
                  background: "#fafafa",
                  whiteSpace: "nowrap",
                },
                "& td": {
                  p: 2,
                  borderTop: "1px solid #f1f5f9",
                  fontSize: 13,
                  whiteSpace: "nowrap",
                },
                "& tbody tr:hover": { background: "#fafafa" },
              }}
            >
              <thead>
                <tr>
                  {[
                    ["name", "Customer"],
                    ["service", "Service"],
                    ["joinedDate", "Date"],
                  ].map(([field, label]) => (
                    <th key={field}>
                      <Box
                        component="button"
                        type="button"
                        onClick={() =>
                          handleRequestSort(
                            field as "name" | "service" | "joinedDate",
                          )
                        }
                        sx={{
                          border: 0,
                          background: "transparent",
                          p: 0,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.5,
                          color: "inherit",
                          font: "inherit",
                          textTransform: "inherit",
                          cursor: "pointer",
                        }}
                      >
                        {label}{" "}
                        {sortIcon(field as "name" | "service" | "joinedDate")}
                      </Box>
                    </th>
                  ))}
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.length ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          sx={{ alignItems: "center" }}
                        >
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 2,
                              background:
                                "linear-gradient(135deg,#eef2ff,#e0e7ff)",
                              color: "#4f46e5",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 700,
                              fontSize: 12,
                              flexShrink: 0,
                            }}
                          >
                            {customer.name.charAt(0)}
                          </Box>
                          <Box>
                            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                              {customer.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "text.secondary", fontSize: 10 }}
                            >
                              {customer.email}
                            </Typography>
                          </Box>
                        </Stack>
                      </td>
                      <td>{customer.service}</td>
                      <td>{customer.joinedDate}</td>
                      <td>
                        <Chip
                          label={customer.status}
                          size="small"
                          sx={{
                            fontSize: 10,
                            fontWeight: 600,
                            background:
                              customer.status === "Active"
                                ? "#ecfdf3"
                                : customer.status === "Pending"
                                  ? "#fffbeb"
                                  : "#f1f5f9",
                            color:
                              customer.status === "Active"
                                ? "#15803d"
                                : customer.status === "Pending"
                                  ? "#b45309"
                                  : "#64748b",
                          }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <Box sx={{ py: 7, textAlign: "center" }}>
                        <FiSearch size={22} color="#4f46e5" />
                        <Typography
                          sx={{
                            mt: 1,
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#334155",
                          }}
                        >
                          No customers found
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                          Try changing your search or status filter.
                        </Typography>
                      </Box>
                    </td>
                  </tr>
                )}
              </tbody>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
