import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/customers/Customers";

import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";

import "./App.css";

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const getActivePage = () => {
    if (location.pathname === "/customers") {
      return "Customers";
    }

    return "Dashboard";
  };

  const activePage = getActivePage();

  const handlePageChange = (page: string) => {
    switch (page) {
      case "Dashboard":
        navigate("/dashboard");
        break;

      case "Customers":
        navigate("/customers");
        break;

      case "Settings":
        // Settings page abhi available nahi hai
        break;

      case "Logout":
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        navigate("/login", {
          replace: true,
        });
        break;

      default:
        navigate("/dashboard");
    }
  };

  return (
    <div className="app">
      <Sidebar activePage={activePage} setActivePage={handlePageChange} />

      <main className="main-content">
        <Header title={activePage} />

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/customers" element={<Customers />} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={
            <Login
              onLogin={() => {
                localStorage.setItem("isLoggedIn", "true");

                window.location.href = "/dashboard";
              }}
            />
          }
        />

        {/* ================ PROTECTED APP ================ */}

        <Route path="/*" element={<ProtectedLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
