interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="header">
      <div>
        <h1>{title}</h1>

        <p>
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="header-right">
        <button className="notification-btn">
          🔔
        </button>

        <div className="profile">
          <div className="profile-avatar">
            A
          </div>

          <div className="profile-info">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;