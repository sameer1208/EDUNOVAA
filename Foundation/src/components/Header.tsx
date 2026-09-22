import { FiBell, FiChevronDown, FiUser, FiSearch } from "react-icons/fi";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header
      style={{
        height: "78px",
        minHeight: "78px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        boxSizing: "border-box",
      }}
    >
      {/* ================= LEFT ================= */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#111827",
            fontSize: "20px",
            fontWeight: 750,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            margin: 0,
            color: "#94a3b8",
            fontSize: "11px",
            fontWeight: 500,
          }}
        >
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* ================= RIGHT ================= */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          style={{
            width: "40px",
            height: "40px",
            border: "none",
            outline: "none",
            borderRadius: "10px",
            background: "transparent",
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f8fafc";
            e.currentTarget.style.color = "#4f46e5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#64748b";
          }}
        >
          <FiSearch size={18} />
        </button>

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          style={{
            width: "40px",
            height: "40px",
            border: "none",
            outline: "none",
            borderRadius: "10px",
            background: "transparent",
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            transition: "background 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f8fafc";
            e.currentTarget.style.color = "#4f46e5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#64748b";
          }}
        >
          <FiBell size={18} />

          <span
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4f46e5",
              border: "1.5px solid #ffffff",
            }}
          />
        </button>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "30px",
            background: "#f1f5f9",
            margin: "0 8px",
          }}
        />

        {/* Profile */}
        <button
          type="button"
          aria-label="User profile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "none",
            outline: "none",
            padding: "6px 10px 6px 6px",
            borderRadius: "10px",
            background: "transparent",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f8fafc";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #4f46e5, #6366f1)",
              color: "#ffffff",
              boxShadow: "0 5px 14px rgba(79, 70, 229, 0.20)",
              flexShrink: 0,
            }}
          >
            <FiUser size={17} />
          </div>

          {/* User Info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "2px",
            }}
          >
            <strong
              style={{
                color: "#111827",
                fontSize: "13px",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Admin User
            </strong>

            <span
              style={{
                color: "#94a3b8",
                fontSize: "10px",
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Administrator
            </span>
          </div>

          <FiChevronDown size={16} color="#64748b" />
        </button>
      </div>
    </header>
  );
};

export default Header;
