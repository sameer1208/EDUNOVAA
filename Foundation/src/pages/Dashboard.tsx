import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import {
  FiUsers,
  FiActivity,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
  FiArrowUpRight,
  FiCalendar,
  FiMoreHorizontal,
} from "react-icons/fi";

import { LineChart, BarChart, PieChart } from "@mui/x-charts";

import {
  dashboardStats,
  revenueData,
  serviceData,
  requestStatusData,
  serviceRequests,
} from "../data/mockdata";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  icon: React.ReactNode;
  iconBackground: string;
}

const StatCard = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  iconBackground,
}: StatCardProps) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        transition: "all 0.2s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Card Header */}
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: 25,
                  sm: 28,
                },
                fontWeight: 700,
                mt: 1,
                color: "#111827",
              }}
            >
              {value}
            </Typography>
          </Box>

          {/* Icon */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5,
              background: iconBackground,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Stack>

        {/* Trend */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            mt: 2,
          }}
        >
          <Chip
            icon={<FiTrendingUp />}
            label={trend}
            size="small"
            sx={{
              height: 24,
              background: "#ecfdf3",
              color: "#15803d",
              fontWeight: 600,

              "& .MuiChip-icon": {
                color: "#15803d",
              },
            }}
          />

          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
            }}
          >
            {subtitle}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
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
            value={dashboardStats.totalCustomers.toLocaleString()}
            subtitle="vs last month"
            trend="+12%"
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
            value={dashboardStats.activeServices.toString()}
            subtitle="currently active"
            trend="+8%"
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
            value={dashboardStats.pendingRequests.toString()}
            subtitle="5 new today"
            trend="+5"
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
            value={`$${dashboardStats.revenue.toLocaleString()}`}
            subtitle="vs last month"
            trend="+15%"
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
                    Monthly revenue performance
                  </Typography>
                </Box>

                <Chip
                  label="+15%"
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
                Current request distribution
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

      {/* =====================================================
          SERVICE PERFORMANCE
      ====================================================== */}

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
            Requests by service
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

      {/* =====================================================
          RECENT REQUESTS
      ====================================================== */}

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
          {/* Table Header */}
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              p: 2.5,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                Recent Service Requests
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                }}
              >
                Latest customer requests
              </Typography>
            </Box>

            <Chip
              label="View All"
              deleteIcon={<FiArrowUpRight />}
              onDelete={() => {}}
              variant="outlined"
              sx={{
                cursor: "pointer",
              }}
            />
          </Stack>

          <Divider />

          {/* Table */}
          <Box
            sx={{
              overflowX: "auto",
            }}
          >
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

                "& tbody tr:hover": {
                  background: "#fafafa",
                },
              }}
            >
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {serviceRequests.map((request) => (
                  <tr key={request.id}>
                    {/* Customer */}
                    <td>
                      <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: 2,
                            background: "#eef2ff",
                            color: "#4f46e5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 12,
                            flexShrink: 0,
                          }}
                        >
                          {request.customer.charAt(0)}
                        </Box>

                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          {request.customer}
                        </Typography>
                      </Stack>
                    </td>

                    {/* Service */}
                    <td>{request.service}</td>

                    {/* Date */}
                    <td>{request.date}</td>

                    {/* Status */}
                    <td>
                      <Chip
                        label={request.status}
                        size="small"
                        sx={{
                          fontSize: 10,
                          fontWeight: 600,

                          background:
                            request.status === "Completed"
                              ? "#ecfdf3"
                              : request.status === "Pending"
                                ? "#fffbeb"
                                : "#eff6ff",

                          color:
                            request.status === "Completed"
                              ? "#15803d"
                              : request.status === "Pending"
                                ? "#b45309"
                                : "#1d4ed8",
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
