import { useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] =
    useState<string>("");

  const [errors, setErrors] =
    useState<LoginErrors>({});

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const newErrors: LoginErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password =
        "Password is required";
    } else if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onLogin();
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-icon">S</div>

          <span>ServiceHub</span>
        </div>

        <div className="login-heading">
          <h1>Welcome Back</h1>

          <p>
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>
              ) =>
                setEmail(event.target.value)
              }
            />

            {errors.email && (
              <span className="error-message">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>
              ) =>
                setPassword(event.target.value)
              }
            />

            {errors.password && (
              <span className="error-message">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;