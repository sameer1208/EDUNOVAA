import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] =
    useState<boolean>(false);

  const [activePage, setActivePage] =
    useState<string>("Dashboard");

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
      />
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case "Customers":
        return <Customers />;

      case "Dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        <Header title={activePage} />

        {renderPage()}
      </main>
    </div>
  );
};

export default App;