import {
  FiGrid,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import "./Sidebar.css";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

interface MenuItem {
  name: string;
  icon: React.ReactNode;
}

const Sidebar = ({ activePage, setActivePage }: SidebarProps) => {
  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      icon: <FiGrid />,
    },
    {
      name: "Customers",
      icon: <FiUsers />,
    },
  ];

  return (
    <aside className="sidebar">
      {/* ================= LOGO ================= */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <span>S</span>
        </div>

        <div className="logo-content">
          <span className="logo-title">ServiceHub</span>
          <span className="logo-subtitle">Management Portal</span>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="sidebar-section-title">MENU</div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const isActive = activePage === item.name;

          return (
            <button
              key={item.name}
              type="button"
              className={`sidebar-item ${isActive ? "active" : ""}`}
              onClick={() => setActivePage(item.name)}
            >
              <span className="sidebar-icon">{item.icon}</span>

              <span className="sidebar-item-name">{item.name}</span>

              {isActive && (
                <span className="sidebar-arrow">
                  <FiChevronRight />
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ================= BOTTOM ================= */}
      <div className="sidebar-bottom">
        <div className="sidebar-section-title">ACCOUNT</div>

        <button
          type="button"
          className="sidebar-item"
          onClick={() => setActivePage("Settings")}
        >
          <span className="sidebar-icon">
            <FiSettings />
          </span>

          <span className="sidebar-item-name">Settings</span>
        </button>

        <button
          type="button"
          className="sidebar-item logout-item"
          onClick={() => setActivePage("Logout")}
        >
          <span className="sidebar-icon">
            <FiLogOut />
          </span>

          <span className="sidebar-item-name">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
