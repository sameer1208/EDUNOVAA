import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  FiLock,
  FiMail,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";

interface LoginProps {
  onLogin: () => void;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: LoginErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onLogin();
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);

    if (errors.email) {
      setErrors((prev) => ({
        ...prev,
        email: undefined,
      }));
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);

    if (errors.password) {
      setErrors((prev) => ({
        ...prev,
        password: undefined,
      }));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #eef4ff 0%, #f8faff 45%, #eaf7ff 100%)",
        px: 2,
        boxSizing: "border-box",
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(59,130,246,0.03))",
          top: -180,
          right: -120,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(59,130,246,0.02))",
          bottom: -170,
          left: -120,
        }}
      />

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 440,
          position: "relative",
          zIndex: 1,
          p: { xs: 3, sm: 4.5 },
          borderRadius: 4,
          background: "rgba(255,255,255,0.94)",
          border: "1px solid rgba(226,232,240,0.9)",
          boxShadow: "0 25px 60px rgba(15,23,42,0.10)",
          backdropFilter: "blur(10px)",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.2,
            mb: 3.5,
          }}
        >
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              color: "#fff",
              fontSize: 22,
              fontWeight: 800,
              boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
            }}
          >
            S
          </Box>

          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.5px",
            }}
          >
            ServiceHub
          </Typography>
        </Box>

        {/* Heading */}
        <Box sx={{ textAlign: "center", mb: 3.5 }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: 26, sm: 30 },
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.8px",
              mb: 0.8,
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            sx={{
              fontSize: 14.5,
              color: "#64748b",
            }}
          >
            Sign in to access your dashboard
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <Box sx={{ mb: 2.5 }}>
            <Typography
              component="label"
              sx={{
                display: "block",
                fontSize: 13.5,
                fontWeight: 600,
                color: "#334155",
                mb: 0.8,
              }}
            >
              Email Address
            </Typography>

            <TextField
              fullWidth
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              autoComplete="email"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiMail size={18} color="#64748b" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
                  fontSize: 14,
                  transition: "all 0.2s ease",

                  "& fieldset": {
                    borderColor: errors.email ? "#ef4444" : "#e2e8f0",
                  },

                  "&:hover fieldset": {
                    borderColor: errors.email ? "#ef4444" : "#94a3b8",
                  },

                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#2563eb",
                    borderWidth: 1.5,
                  },
                },

                "& .MuiFormHelperText-root": {
                  marginLeft: 0,
                  marginTop: 0.7,
                  fontSize: 12,
                },
              }}
            />
          </Box>

          {/* Password */}
          <Box sx={{ mb: 3 }}>
            <Typography
              component="label"
              sx={{
                display: "block",
                fontSize: 13.5,
                fontWeight: 600,
                color: "#334155",
                mb: 0.8,
              }}
            >
              Password
            </Typography>

            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              autoComplete="current-password"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiLock size={18} color="#64748b" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        size="small"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <FiEyeOff size={18} />
                        ) : (
                          <FiEye size={18} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8fafc",
                  fontSize: 14,

                  "& fieldset": {
                    borderColor: errors.password ? "#ef4444" : "#e2e8f0",
                  },

                  "&:hover fieldset": {
                    borderColor: errors.password ? "#ef4444" : "#94a3b8",
                  },

                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#2563eb",
                    borderWidth: 1.5,
                  },
                },

                "& .MuiFormHelperText-root": {
                  marginLeft: 0,
                  marginTop: 0.7,
                  fontSize: 12,
                },
              }}
            />
          </Box>

          {/* Login button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            endIcon={<FiArrowRight size={18} />}
            sx={{
              height: 50,
              borderRadius: 2,
              textTransform: "none",
              fontSize: 15,
              fontWeight: 700,
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              boxShadow: "0 10px 22px rgba(37,99,235,0.25)",
              "&:hover": {
                background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                boxShadow: "0 12px 26px rgba(37,99,235,0.32)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Sign In
          </Button>
        </form>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.7,
            mt: 3,
            color: "#94a3b8",
          }}
        >
          <FiShield size={14} />

          <Typography
            sx={{
              fontSize: 12,
              color: "#94a3b8",
            }}
          >
            Secure access to your account
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
