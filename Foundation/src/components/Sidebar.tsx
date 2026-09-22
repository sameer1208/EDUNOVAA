interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

interface MenuItem {
  name: string;
  icon: string;
}

const Sidebar = ({
  activePage,
  setActivePage,
}: SidebarProps) => {
  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      icon: "▦",
    },
    {
      name: "Customers",
      icon: "👥",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">S</div>
        <span>ServiceHub</span>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`sidebar-item ${
              activePage === item.name ? "active" : ""
            }`}
            onClick={() => setActivePage(item.name)}
          >
            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="sidebar-item">
          <span className="sidebar-icon">⚙</span>
          <span>Settings</span>
        </button>

        <button className="sidebar-item">
          <span className="sidebar-icon">↪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;