import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { FiTrendingUp } from "react-icons/fi";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  icon: React.ReactNode;
  iconBackground: string;
}

export const StatCard = ({
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
