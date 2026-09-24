import { FiBell, FiChevronDown, FiUser, FiSearch } from "react-icons/fi";
import "./Header.css";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="app-header" aria-label="Application header">
      {/* ================= LEFT ================= */}
      <div className="header-left">
        <h1 className="header-title">{title}</h1>
        <p className="header-subtitle">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="header-right">
        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          className="header-icon-button"
        >
          <FiSearch size={18} />
        </button>

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="header-icon-button notification-button"
        >
          <FiBell size={18} />
          <span className="notification-dot" />
        </button>

        {/* Divider */}
        <div className="header-divider" />

        {/* Profile */}
        <button
          type="button"
          aria-label="User profile"
          className="profile-button"
        >
          <div className="profile-avatar">
            <FiUser size={17} />
          </div>

          <div className="profile-info">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>

          <FiChevronDown
            className="profile-chevron"
            size={16}
            color="#64748b"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
